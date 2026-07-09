# Nativo Language Coach Prototype

Nativo is a calm language-learning prototype built with plain HTML, CSS, JavaScript, and a small Netlify Function that securely calls the Google Gemini API.

## Developer Note

Nativo keeps native language and target language separate:

- Native language controls the interface language and explanation language.
- Target language controls the language the user is learning.
- User input is usually written in the native language.
- Learning output translates from the native language into the target language.

The supported interface languages are configured in `app.js` through:

- `languages`
- `uiTranslations`
- `targetLanguageNames`

To add another interface language later, add it to `languages`, add translated UI strings to `uiTranslations`, and add localized language names to `targetLanguageNames`.

## Deployment

Recommended hosting: Netlify.

This project is a plain frontend plus one Netlify Function, not React and not Next.js. Netlify is the simplest free option because it can host the static files and the serverless function together.

### Gemini API Setup

1. Go to Google AI Studio: `https://aistudio.google.com/`.
2. Create or open an API key for the Gemini API.
3. In Netlify, open your site dashboard.
4. Go to **Site configuration → Environment variables → Add variable**.
5. Add:

```text
GEMINI_API_KEY=your_real_key_here
```

Do not put the key in `index.html`, `app.js`, or any browser code. The frontend calls `/.netlify/functions/coach`, and the function reads `GEMINI_API_KEY` on the server.

### Build Locally

```bash
npm run build
```

This creates the production-ready folder:

```text
dist/
```

### Deploy With GitHub

1. Put this project folder in a GitHub repository.
2. In Netlify, choose **Add new site** and connect the repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Add `GEMINI_API_KEY` in Netlify environment variables.
5. Redeploy the site.

This is the recommended deployment path for the AI-powered version.

### Deploy Without GitHub

You can deploy manually with the Netlify CLI, but simple Netlify Drop of only `dist/` is no longer enough because the AI coach requires the Netlify Function.

1. Install or run Netlify CLI.
2. Link the project to your Netlify site.
3. Make sure `GEMINI_API_KEY` is set in Netlify.
4. Run a production deploy from this project root after `npm run build`.

### Free Plan

The Netlify free plan should be enough for a small prototype. Gemini also offers free-tier options for some models, but public sharing can exhaust free-tier limits. Keep the prototype lightly shared, monitor usage, and set billing alerts or quota controls in Google Cloud where possible.

### Test the AI Call

After deployment:

1. Open the Netlify site URL.
2. Complete onboarding.
3. Enter a short sentence under 500 characters.
4. Submit it.
5. Confirm the learning card is specific to that sentence.

You can also test the function endpoint directly with your deployed URL:

```bash
curl -X POST "https://YOUR_SITE.netlify.app/.netlify/functions/coach" \
  -H "Content-Type: application/json" \
  -d '{
    "userSentence": "Ich esse gleich Hähnchen mit Reis.",
    "nativeLanguage": "German",
    "targetLanguage": "Spanish",
    "level": "Beginner"
  }'
```

### Free-Tier Safety Notes

- User input is limited to 500 characters.
- The function validates required fields.
- The app does not store API keys in frontend code.
- The function does not intentionally log full user sentences.
- A basic in-memory rate limit is included, but it is not a complete production-grade quota system because serverless instances can scale independently.
- For public launches, add stronger rate limiting, abuse protection, and usage monitoring.

### Notes

- The app uses relative asset paths: `./styles.css` and `./app.js`.
- The favicon is embedded as a data URL.
- There are no private local filesystem paths in the deployed app.
- The AI coach runs through `netlify/functions/coach.mjs`.
