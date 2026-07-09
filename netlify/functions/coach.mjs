import { randomUUID } from "node:crypto";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const MAX_SENTENCE_LENGTH = 500;
const GEMINI_TIMEOUT_MS = 14_000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const requestBuckets = new Map();

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

const systemInstruction = `You are Nativo, a calm science-based language coach. Return only strict JSON with exactly these keys: naturalTranslation, literalMeaning, simpleGrammar, usefulChunks, similarExamples, tryAgainPrompt. Translate naturally into targetLanguage. Write literalMeaning, simpleGrammar, usefulChunks.meaning, and tryAgainPrompt in nativeLanguage. Write naturalTranslation, usefulChunks.chunk, and similarExamples in targetLanguage. Keep output short. Use 2-5 phrase chunks, not isolated words. Use 2-3 similar examples. No markdown, lessons, games, or multiple-choice.`;

export default async function handler(req, context) {
  const requestId = randomUUID();
  safeLog(requestId, "coach request received", { method: req.method });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  if (req.method !== "POST") {
    return errorResponse("METHOD_NOT_ALLOWED", "Method not allowed.", 405);
  }

  const rateLimit = checkRateLimit(getClientKey(req, context));
  if (!rateLimit.allowed) {
    safeLog(requestId, "validation failed reason", { reason: "RATE_LIMITED" });
    return errorResponse("RATE_LIMITED", "Too many requests. Please wait a moment and try again.", 429);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    safeLog(requestId, "validation failed reason", { reason: "MISSING_GEMINI_API_KEY" });
    return errorResponse("SERVER_MISCONFIGURED", "Gemini API key is not configured.", 500);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    safeLog(requestId, "validation failed reason", { reason: "INVALID_JSON_BODY" });
    return errorResponse("INVALID_JSON_BODY", "Invalid JSON request body.", 400);
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    safeLog(requestId, "validation failed reason", { reason: validationError.code });
    return errorResponse(validationError.code, validationError.message, 400);
  }

  const userSentence = payload.userSentence.trim().slice(0, MAX_SENTENCE_LENGTH);
  const nativeLanguage = payload.nativeLanguage.trim();
  const targetLanguage = payload.targetLanguage.trim();
  const level = (payload.level || "Beginner").trim();
  const modelPath = normalizeModelPath(GEMINI_MODEL);
  const endpointPath = `/v1beta/${modelPath}:generateContent`;
  const geminiEndpoint = `${GEMINI_API_BASE}${endpointPath}?key=${encodeURIComponent(apiKey)}`;
  const geminiRequestBody = buildGeminiRequestBody({
    nativeLanguage,
    targetLanguage,
    level,
    userSentence
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    safeLog(requestId, "Gemini request started", {
      selectedModel: GEMINI_MODEL,
      endpointPath,
      nativeLanguage,
      targetLanguage,
      level,
      sentenceLength: userSentence.length,
      requestKeys: Object.keys(geminiRequestBody),
      generationConfigKeys: Object.keys(geminiRequestBody.generationConfig)
    });

    let geminiResponse = await fetch(geminiEndpoint, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(geminiRequestBody)
    });

    safeLog(requestId, "Gemini response received", { status: geminiResponse.status, ok: geminiResponse.ok });

    if (!geminiResponse.ok && geminiResponse.status === 400 && geminiRequestBody.generationConfig.responseMimeType) {
      const firstGeminiErrorMessage = await readGeminiError(geminiResponse);
      safeLog(requestId, "Gemini error message", {
        status: geminiResponse.status,
        message: firstGeminiErrorMessage
      });

      const fallbackRequestBody = buildPlainJsonPromptRequestBody(geminiRequestBody);
      safeLog(requestId, "Gemini request started", {
        selectedModel: GEMINI_MODEL,
        endpointPath,
        retryWithoutResponseMimeType: true,
        requestKeys: Object.keys(fallbackRequestBody),
        generationConfigKeys: Object.keys(fallbackRequestBody.generationConfig)
      });

      geminiResponse = await fetch(geminiEndpoint, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fallbackRequestBody)
      });

      safeLog(requestId, "Gemini response received", {
        status: geminiResponse.status,
        ok: geminiResponse.ok,
        retryWithoutResponseMimeType: true
      });
    }

    clearTimeout(timeout);

    if (!geminiResponse.ok) {
      const geminiErrorMessage = await readGeminiError(geminiResponse);
      safeLog(requestId, "Gemini error message", {
        status: geminiResponse.status,
        message: geminiErrorMessage
      });
      safeLog(requestId, "validation failed reason", { reason: "GEMINI_REQUEST_FAILED", status: geminiResponse.status });
      return errorResponse("GEMINI_REQUEST_FAILED", "Gemini request failed.", 502, {
        geminiStatus: geminiResponse.status,
        geminiMessage: geminiErrorMessage
      });
    }

    const geminiData = await geminiResponse.json();
    const outputText = extractOutputText(geminiData);
    safeLog(requestId, "Gemini response text length", { length: outputText.length });

    const jsonText = extractJsonObjectText(outputText);
    const parsed = parseJsonText(jsonText);
    const parsedValidationError = validateCoachResponse(parsed);
    if (parsedValidationError) {
      safeLog(requestId, "validation failed reason", { reason: parsedValidationError });
      return errorResponse("AI_RESPONSE_VALIDATION_FAILED", "Gemini response did not match the expected shape.", 502);
    }

    const normalized = normalizeCoachResponse(parsed);
    const normalizedValidationError = validateCoachResponse(normalized);
    if (normalizedValidationError) {
      safeLog(requestId, "validation failed reason", { reason: normalizedValidationError });
      return errorResponse("AI_RESPONSE_VALIDATION_FAILED", "Gemini response did not match the expected shape.", 502);
    }

    safeLog(requestId, "JSON parsed successfully", {
      chunkCount: normalized.usefulChunks.length,
      exampleCount: normalized.similarExamples.length
    });

    return jsonResponse(normalized, 200);
  } catch (error) {
    clearTimeout(timeout);
    if (error?.name === "AbortError") {
      safeLog(requestId, "Gemini request timed out", { timeoutMs: GEMINI_TIMEOUT_MS });
      return errorResponse("GEMINI_REQUEST_TIMEOUT", "Gemini request timed out.", 504);
    }

    if (error instanceof SyntaxError || error?.code === "AI_RESPONSE_PARSE_FAILED") {
      safeLog(requestId, "validation failed reason", { reason: "AI_RESPONSE_PARSE_FAILED" });
      return errorResponse("AI_RESPONSE_PARSE_FAILED", "Could not parse Gemini response.", 502);
    }

    safeLog(requestId, "validation failed reason", { reason: "COACH_RESPONSE_FAILED" });
    return errorResponse("COACH_RESPONSE_FAILED", "Coach response could not be generated.", 502);
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { code: "MISSING_BODY", message: "Missing request body." };
  }

  if (typeof payload.userSentence !== "string" || !payload.userSentence.trim()) {
    return { code: "MISSING_USER_SENTENCE", message: "Missing userSentence." };
  }

  if (payload.userSentence.length > MAX_SENTENCE_LENGTH) {
    return {
      code: "USER_SENTENCE_TOO_LONG",
      message: `userSentence must be ${MAX_SENTENCE_LENGTH} characters or fewer.`
    };
  }

  if (typeof payload.nativeLanguage !== "string" || !payload.nativeLanguage.trim()) {
    return { code: "MISSING_NATIVE_LANGUAGE", message: "Missing nativeLanguage." };
  }

  if (typeof payload.targetLanguage !== "string" || !payload.targetLanguage.trim()) {
    return { code: "MISSING_TARGET_LANGUAGE", message: "Missing targetLanguage." };
  }

  return null;
}

function normalizeModelPath(model) {
  const trimmed = String(model || "").trim() || "gemini-2.5-flash-lite";
  return trimmed.includes("/") ? trimmed : `models/${trimmed}`;
}

function buildGeminiRequestBody({ nativeLanguage, targetLanguage, level, userSentence }) {
  return {
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: [
              "Create one short Nativo learning card for this exact sentence.",
              "Return only valid JSON. Do not include markdown, comments, or extra text.",
              "Use exactly this JSON shape:",
              '{"naturalTranslation":"","literalMeaning":"","simpleGrammar":"","usefulChunks":[{"chunk":"","meaning":""}],"similarExamples":[],"tryAgainPrompt":""}',
              `nativeLanguage: ${nativeLanguage}`,
              `targetLanguage: ${targetLanguage}`,
              `level: ${level}`,
              `userSentence: ${userSentence}`,
              "Language rules:",
              "- naturalTranslation, usefulChunks.chunk, and similarExamples must be in targetLanguage.",
              "- literalMeaning, simpleGrammar, usefulChunks.meaning, and tryAgainPrompt must be in nativeLanguage.",
              "- Explain only one or two useful grammar points.",
              "- Use 2 to 5 useful phrase chunks, not isolated vocabulary.",
              "- Use 2 or 3 similar real-life examples.",
              "- Keep every field short and practical.",
              "- Do not create lessons, multiple-choice tasks, or gamified text."
            ].join("\n")
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 500,
      responseMimeType: "application/json"
    }
  };
}

function buildPlainJsonPromptRequestBody(requestBody) {
  const generationConfig = { ...requestBody.generationConfig };
  delete generationConfig.responseMimeType;

  return {
    ...requestBody,
    generationConfig
  };
}

function normalizeCoachResponse(value) {
  return {
    naturalTranslation: asShortString(value.naturalTranslation),
    literalMeaning: asShortString(value.literalMeaning),
    simpleGrammar: asShortString(value.simpleGrammar),
    usefulChunks: Array.isArray(value.usefulChunks)
      ? value.usefulChunks.slice(0, 5).map((chunk) => ({
          chunk: asShortString(chunk.chunk),
          meaning: asShortString(chunk.meaning)
        })).filter((chunk) => chunk.chunk && chunk.meaning)
      : [],
    similarExamples: Array.isArray(value.similarExamples)
      ? value.similarExamples.slice(0, 3).map(asShortString).filter(Boolean)
      : [],
    tryAgainPrompt: asShortString(value.tryAgainPrompt)
  };
}

function asShortString(value) {
  return typeof value === "string" ? value.trim().slice(0, 700) : "";
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string") return data.output_text;
  if (typeof data?.outputText === "string") return data.outputText;

  const stepText = data?.steps
    ?.flatMap((step) => step?.model_output?.content ?? step?.modelOutput?.content ?? [])
    ?.map((content) => content?.text?.text ?? content?.text)
    ?.find((text) => typeof text === "string" && text.trim());
  if (stepText) return stepText;

  const candidateText = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    ?.join("");
  if (candidateText) return candidateText;

  throw new Error("No Gemini output text found.");
}

function extractJsonObjectText(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) {
    throw parseError("Empty Gemini response text.");
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;

  if (candidate.startsWith("{") && candidate.endsWith("}")) {
    return candidate;
  }

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw parseError("No JSON object found in Gemini response.");
  }

  return candidate.slice(start, end + 1);
}

function parseJsonText(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw parseError("Invalid JSON returned by Gemini.");
  }
}

function parseError(message) {
  const error = new Error(message);
  error.code = "AI_RESPONSE_PARSE_FAILED";
  return error;
}

async function readGeminiError(response) {
  let text = "";
  try {
    text = await response.text();
  } catch {
    return "Could not read Gemini error body.";
  }

  if (!text.trim()) {
    return "Gemini returned an empty error body.";
  }

  try {
    const body = JSON.parse(text);
    return asSafeErrorMessage(body?.error?.message || body?.message || text);
  } catch {
    return asSafeErrorMessage(text);
  }
}

function asSafeErrorMessage(message) {
  return String(message ?? "")
    .replace(/key=([^&\s]+)/gi, "key=[redacted]")
    .replace(/AIza[0-9A-Za-z_-]+/g, "[redacted]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
}

function validateCoachResponse(value) {
  const expectedKeys = [
    "naturalTranslation",
    "literalMeaning",
    "simpleGrammar",
    "usefulChunks",
    "similarExamples",
    "tryAgainPrompt"
  ];
  const actualKeys = Object.keys(value ?? {}).sort();
  const sortedExpected = [...expectedKeys].sort();
  if (JSON.stringify(actualKeys) !== JSON.stringify(sortedExpected)) {
    return "AI_RESPONSE_KEYS_INVALID";
  }

  for (const key of ["naturalTranslation", "literalMeaning", "simpleGrammar", "tryAgainPrompt"]) {
    if (typeof value[key] !== "string") {
      return `${key.toUpperCase()}_INVALID`;
    }
  }

  if (!value.naturalTranslation || !value.simpleGrammar || !value.tryAgainPrompt) {
    return "AI_RESPONSE_REQUIRED_TEXT_MISSING";
  }

  if (!Array.isArray(value.usefulChunks) || value.usefulChunks.length < 1 || value.usefulChunks.length > 5) {
    return "USEFUL_CHUNKS_INVALID";
  }

  for (const chunk of value.usefulChunks) {
    const chunkKeys = Object.keys(chunk ?? {}).sort();
    if (JSON.stringify(chunkKeys) !== JSON.stringify(["chunk", "meaning"])) {
      return "USEFUL_CHUNK_KEYS_INVALID";
    }
    if (typeof chunk.chunk !== "string" || !chunk.chunk || typeof chunk.meaning !== "string" || !chunk.meaning) {
      return "USEFUL_CHUNK_VALUES_INVALID";
    }
  }

  if (!Array.isArray(value.similarExamples) || value.similarExamples.length < 1 || value.similarExamples.length > 3) {
    return "SIMILAR_EXAMPLES_INVALID";
  }

  if (value.similarExamples.some((example) => typeof example !== "string" || !example)) {
    return "SIMILAR_EXAMPLES_VALUES_INVALID";
  }

  return "";
}

function getClientKey(req, context) {
  return (
    context?.ip ||
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous"
  );
}

function checkRateLimit(clientKey) {
  const now = Date.now();
  const bucket = requestBuckets.get(clientKey) ?? [];
  const recent = bucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestBuckets.set(clientKey, recent);
    return { allowed: false };
  }
  recent.push(now);
  requestBuckets.set(clientKey, recent);
  return { allowed: true };
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders
  });
}

function errorResponse(error, message, status, details = {}) {
  return jsonResponse({ error, message, ...details }, status);
}

function safeLog(requestId, event, details = {}) {
  console.log(JSON.stringify({
    requestId,
    event,
    ...details
  }));
}
