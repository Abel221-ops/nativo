const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_MODEL = "gemini-3.5-flash";
const MAX_SENTENCE_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const requestBuckets = new Map();

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

const responseSchema = {
  type: "object",
  properties: {
    naturalTranslation: {
      type: "string",
      description: "A natural translation of the user's sentence in the target language."
    },
    literalMeaning: {
      type: "string",
      description: "A short literal explanation in the native language, only if useful."
    },
    simpleGrammar: {
      type: "string",
      description: "One or two short grammar points in the native language."
    },
    usefulChunks: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          chunk: {
            type: "string",
            description: "A useful phrase or chunk in the target language."
          },
          meaning: {
            type: "string",
            description: "The meaning of the chunk in the native language."
          }
        },
        required: ["chunk", "meaning"],
        additionalProperties: false
      }
    },
    similarExamples: {
      type: "array",
      minItems: 2,
      maxItems: 3,
      items: {
        type: "string",
        description: "A similar useful sentence in the target language."
      }
    },
    tryAgainPrompt: {
      type: "string",
      description: "One active recall prompt in the native language."
    }
  },
  required: [
    "naturalTranslation",
    "literalMeaning",
    "simpleGrammar",
    "usefulChunks",
    "similarExamples",
    "tryAgainPrompt"
  ],
  additionalProperties: false
};

const systemInstruction = `You are Nativo, a calm, minimalist, science-based language coach.

Your goal is to help the user express real thoughts naturally in the target language.

You receive:

* nativeLanguage: the user's language for explanations
* targetLanguage: the language the user wants to learn
* level: the user's current level
* userSentence: the sentence the user wants to say

Rules:

1. Translate the user's sentence naturally into the target language.
2. Do not translate word-for-word if it sounds unnatural.
3. Explain only one or two important grammar points.
4. Keep explanations short and simple.
5. Explain grammar in the user's native language.
6. Extract useful chunks and phrases, not isolated vocabulary.
7. Give two or three similar real-life examples.
8. Create one active recall prompt.
9. Do not create multiple-choice exercises.
10. Do not create lessons.
11. Do not use gamified language.
12. Do not overload the user.
13. Return only valid JSON.
14. Do not include markdown.
15. Do not include extra text outside the JSON.`;

export default async function handler(req, context) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const rateLimit = checkRateLimit(getClientKey(req, context));
  if (!rateLimit.allowed) {
    return jsonResponse({ error: "Too many requests. Please wait a moment and try again." }, 429);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "Gemini API key is not configured." }, 500);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON request body." }, 400);
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return jsonResponse({ error: validationError }, 400);
  }

  const userSentence = payload.userSentence.trim().slice(0, MAX_SENTENCE_LENGTH);
  const nativeLanguage = payload.nativeLanguage.trim();
  const targetLanguage = payload.targetLanguage.trim();
  const level = (payload.level || "Beginner").trim();

  try {
    const geminiResponse = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        system_instruction: systemInstruction,
        input: JSON.stringify({
          nativeLanguage,
          targetLanguage,
          level,
          userSentence
        }),
        generation_config: {
          temperature: 0.35,
          thinking_level: "low",
          max_output_tokens: 800
        },
        response_format: {
          type: "text",
          mime_type: "application/json",
          schema: responseSchema
        }
      })
    });

    if (!geminiResponse.ok) {
      return jsonResponse({ error: "Gemini request failed." }, 502);
    }

    const geminiData = await geminiResponse.json();
    const outputText = extractOutputText(geminiData);
    const parsed = JSON.parse(outputText);
    const normalized = normalizeCoachResponse(parsed);

    return jsonResponse(normalized, 200);
  } catch {
    return jsonResponse({ error: "Coach response could not be generated." }, 502);
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Missing request body.";
  }

  if (typeof payload.userSentence !== "string" || !payload.userSentence.trim()) {
    return "Missing userSentence.";
  }

  if (payload.userSentence.length > MAX_SENTENCE_LENGTH) {
    return `userSentence must be ${MAX_SENTENCE_LENGTH} characters or fewer.`;
  }

  if (typeof payload.nativeLanguage !== "string" || !payload.nativeLanguage.trim()) {
    return "Missing nativeLanguage.";
  }

  if (typeof payload.targetLanguage !== "string" || !payload.targetLanguage.trim()) {
    return "Missing targetLanguage.";
  }

  return "";
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
