const APP_NAME = "Nativo";
const STORAGE_KEY = "nativo-prototype-state";
const LEGACY_STORAGE_KEY = "own-words-prototype-state";

const languages = [
  { id: "en", locale: "en", nativeName: "English" },
  { id: "de", locale: "de", nativeName: "Deutsch" },
  { id: "es", locale: "es", nativeName: "Español" },
  { id: "it", locale: "it", nativeName: "Italiano" },
  { id: "fr", locale: "fr", nativeName: "Français" }
];

const targetLanguageNames = {
  en: {
    en: "English",
    de: "German",
    es: "Spanish",
    it: "Italian",
    fr: "French"
  },
  de: {
    en: "Englisch",
    de: "Deutsch",
    es: "Spanisch",
    it: "Italienisch",
    fr: "Französisch"
  },
  es: {
    en: "inglés",
    de: "alemán",
    es: "español",
    it: "italiano",
    fr: "francés"
  },
  it: {
    en: "inglese",
    de: "tedesco",
    es: "spagnolo",
    it: "italiano",
    fr: "francese"
  },
  fr: {
    en: "anglais",
    de: "allemand",
    es: "espagnol",
    it: "italien",
    fr: "français"
  }
};

const uiTranslations = {
  en: {
    documentTitle: "Nativo - Language Coach Prototype",
    welcome: {
      title: "Learn a language through your own words.",
      body: "Say something real. Get a natural translation, one useful explanation, and phrases worth remembering.",
      start: "Start"
    },
    nav: {
      aria: "Nativo screens",
      goHome: "Go home",
      home: "Home",
      saved: "Saved",
      review: "Review",
      speaking: "Speak",
      reflection: "Reflect"
    },
    onboarding: {
      title: "A little context is enough.",
      body: "This helps the coach suggest sentences that fit your day. A few details are enough.",
      name: "Name",
      age: "Age",
      nativeLanguage: "Native language",
      targetLanguage: "Target language",
      currentLevel: "Current level",
      optional: "optional",
      location: "City or location",
      interests: "Interests",
      reason: "Reason for learning",
      reasonPlaceholder: "I want to feel comfortable speaking when I travel.",
      localNote: "Nativo keeps this locally in your browser so the prompts can feel personal.",
      begin: "Begin"
    },
    levels: {
      beginner: "Beginner",
      elementary: "Elementary",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    interests: {
      travel: "Travel",
      food: "Food",
      work: "Work",
      university: "University",
      dating: "Dating",
      sports: "Sports",
      music: "Music",
      culture: "Culture"
    },
    home: {
      context: "{namePrefix}one real sentence in {target}.",
      promptDefault: "What do you want to say today?",
      promptLunch: "What are you eating or thinking about right now?",
      promptWork: "What happened at work today?",
      promptEvening: "What happened today?",
      helper: "Write it in {native}, say it aloud, or start with a rough version in {target}.",
      promptIdeas: "Prompt ideas",
      suggestionPlans: "What are your plans today?",
      suggestionMood: "How would you describe your mood?",
      suggestionHappened: "Explain what happened today in one sentence.",
      suggestionDirections: "How would you ask for directions in {location}?",
      suggestionFood: "What did you eat today?",
      suggestionMusic: "What song have you been listening to lately?",
      inputPlaceholder: "I wanted to sleep earlier yesterday, but I was on my phone for too long.",
      mic: "Mic",
      recording: "Recording",
      recordAria: "Record a voice memo",
      useSample: "Use sample",
      send: "Send",
      loadingMessage: "Your sentence is being shaped naturally ...",
      errorMessage: "The AI response could not be loaded right now. Please try again.",
      tooLongMessage: "Please keep your sentence under 500 characters.",
      inputLimit: "Up to 500 characters"
    },
    learning: {
      naturalTranslation: "Natural translation",
      literalMeaning: "Literal meaning",
      basedOn: "Based on",
      simpleGrammar: "Simple grammar",
      usefulChunks: "Useful chunks",
      similarExamples: "Similar examples",
      tryAgain: "Try again",
      tryPlaceholder: "Try from memory, then compare.",
      compareGently: "Compare gently",
      saveForReview: "Save for review",
      save: "Save",
      saved: "Saved",
      compareFeedback: "Good. A natural version is: {answer} Keep the pattern and change one detail from your life."
    },
    saved: {
      kicker: "Saved chunks",
      title: "Phrases from your own life.",
      intro: "Nativo saves useful chunks and sentences, then brings them back when they are ready to be produced from memory.",
      emptyTitle: "Nothing saved yet.",
      emptyBody: "Send a sentence on the home screen and save the chunks that feel useful.",
      goHome: "Go to home",
      practice: "Practice"
    },
    review: {
      kicker: "Active recall",
      title: "Bring the phrase back yourself.",
      intro: "The work is simple: remember, say, and reuse language that already came from your real sentences.",
      compare: "Compare",
      anotherPhrase: "Another phrase",
      naturalAnswer: "Natural answer",
      notice: "Notice the chunk, then try a fresh sentence about your own day.",
      remembered: "I remembered it",
      needsReview: "Bring it back soon",
      emptyTitle: "Your review space is quiet right now.",
      emptyBody: "Save a few phrases from the home screen, and they will return here at useful intervals.",
      saySomething: "Say something",
      taskHowSay: "How would you say this?",
      taskUseOwn: "Use it in your own sentence",
      taskSayNaturally: "Say it naturally",
      placeholderPhrase: "Write or say the phrase from memory.",
      placeholderPersonal: "Make it personal and natural.",
      placeholderSpeaking: "Type what you said, or use the speaking screen.",
      savedFrom: "Saved from: “{source}”",
      contextChange: "Changing the sentence helps the phrase become usable, not just familiar.",
      contextSpeaking: "Short spoken recall reduces hesitation.",
      usePhrasePrompt: "Write a new sentence using: {phrase}",
      sayMeaningPrompt: "Record or type yourself saying: {meaning}",
      exampleUsing: "Example pattern: {phrase} ..."
    },
    speaking: {
      kicker: "Speaking practice",
      title: "Start speaking before it feels perfect.",
      intro: "Record a short thought. The coach focuses on one helpful improvement and leaves the rest alone.",
      cardTitle: "Say one sentence about your day.",
      promptTravel: "Try: ask for something you would need while traveling.",
      promptWork: "Try: describe one thing you finished today.",
      promptDefault: "Try: describe your plans for the next few hours.",
      record: "Record voice memo",
      recording: "Recording...",
      transcript: "Transcript",
      transcriptPlaceholder: "Your voice memo will be transcribed here.",
      analyze: "Give gentle correction",
      saveSentence: "Save sentence",
      naturalVersion: "Natural version",
      improvement: "One useful improvement",
      mySpokenSentence: "My spoken sentence",
      correctionTip: "Focus on one pattern from the sentence instead of correcting every detail.",
      correctionEncouragement: "The goal is less hesitation, then more natural expression over time."
    },
    reflection: {
      kicker: "Reflection",
      title: "Quiet signs of growth.",
      intro: "Nativo can notice useful patterns quietly, then reflect them back in plain language.",
      cardTitle: "{namePrefix}your {target} is becoming more usable.",
      reset: "Reset prototype data",
      patternTitle: "You are building useful sentence patterns.",
      patternPast: "Recent phrases include past-tense ideas, like talking about what you wanted or what happened yesterday.",
      patternSaved: "Your saved phrases will show which patterns are becoming familiar over time.",
      reviewTitle: "Your reviews ask you to produce language.",
      reviewBody: "You are asked to remember, say, and reuse chunks in new personal sentences.",
      speakingTitle: "Speaking stays low-pressure.",
      speakingDone: "You have saved at least one spoken sentence, so future practice can return to language you actually tried to say.",
      speakingReady: "The speaking screen is ready when you want to practice one short thought out loud."
    },
    timing: {
      ready: "ready to review",
      laterToday: "returns later today",
      inDays: "returns in about {days} day{plural}"
    },
    patterns: {
      pastRoutines: "past routines",
      foodRoutines: "food and routines",
      dailyPlans: "daily plans",
      personalExpression: "personal expression",
      speakingConfidence: "speaking confidence"
    },
    samples: {
      mainThought: "I wanted to sleep earlier yesterday, but I was on my phone for too long.",
      voiceThought: "This morning I wanted to make coffee before checking my messages."
    },
    coach: {
      literalSample: "Very close to: yesterday I wanted to go to bed earlier, but I spent too much time with my phone.",
      grammarSample: "In {target}, this sentence uses a natural past form for “wanted” and a separate expression for spending too much time. Focus on the pattern, not each word.",
      trySample: "How would you say: “I wanted to study yesterday, but I was too tired”?",
      foodGrammar: "A short future or near-future pattern is enough here. Use the phrase as a chunk instead of translating each word.",
      foodTry: "How would you say: “I am going to cook something simple tonight”?",
      plansGrammar: "This pattern is useful for plans and wishes. Keep the sentence simple, then change one detail from your own day.",
      plansTry: "How would you say: “Today I want to rest after work”?",
      fallbackLiteral: "The exact AI translation would appear here. This prototype shows the learning structure.",
      fallbackGrammar: "The coach would choose one useful pattern from your sentence and keep the explanation short.",
      fallbackTry: "Say a similar sentence about your own life without looking.",
      chunkMeanings: {
        wantedBed: "I wanted to go to bed",
        earlier: "earlier",
        spentTooLong: "I spent too much time",
        onPhone: "on my phone",
        goingToEat: "I am going to eat",
        somethingSimple: "something simple",
        today: "today",
        todayIWant: "today I want to",
        finishWork: "finish the work",
        goForWalk: "go for a walk",
        wantToSayThis: "I want to say this",
        naturalWay: "in a natural way",
        simple: "simple"
      }
    }
  },
  de: {
    documentTitle: "Nativo - Sprachcoach-Prototyp",
    welcome: {
      title: "Lerne eine Sprache mit deinen eigenen Worten.",
      body: "Sag etwas Echtes. Du bekommst eine natürliche Übersetzung, eine kurze Erklärung und nützliche Satzbausteine.",
      start: "Starten"
    },
    nav: {
      aria: "Nativo-Bereiche",
      goHome: "Zur Startseite",
      home: "Start",
      saved: "Gespeichert",
      review: "Wiederholen",
      speaking: "Sprechen",
      reflection: "Reflexion"
    },
    onboarding: {
      title: "Ein wenig Kontext reicht.",
      body: "So kann der Coach Sätze vorschlagen, die zu deinem Tag passen. Ein paar Angaben genügen.",
      name: "Name",
      age: "Alter",
      nativeLanguage: "Muttersprache",
      targetLanguage: "Zielsprache",
      currentLevel: "Aktuelles Niveau",
      optional: "optional",
      location: "Stadt oder Ort",
      interests: "Interessen",
      reason: "Warum lernst du die Sprache?",
      reasonPlaceholder: "Ich möchte mich beim Reisen sicherer beim Sprechen fühlen.",
      localNote: "Nativo speichert diese Angaben lokal in deinem Browser, damit die Impulse persönlicher wirken.",
      begin: "Beginnen"
    },
    levels: {
      beginner: "Anfänger",
      elementary: "Grundlagen",
      intermediate: "Mittelstufe",
      advanced: "Fortgeschritten"
    },
    interests: {
      travel: "Reisen",
      food: "Essen",
      work: "Arbeit",
      university: "Uni",
      dating: "Dating",
      sports: "Sport",
      music: "Musik",
      culture: "Kultur"
    },
    home: {
      context: "{namePrefix}ein echter Satz auf {target}.",
      promptDefault: "Was möchtest du heute sagen?",
      promptLunch: "Was isst oder denkst du gerade?",
      promptWork: "Was ist heute bei der Arbeit passiert?",
      promptEvening: "Was ist heute passiert?",
      helper: "Schreib es auf {native}, sprich es laut aus oder versuch eine grobe Version auf {target}.",
      promptIdeas: "Impuls-Ideen",
      suggestionPlans: "Was hast du heute vor?",
      suggestionMood: "Wie würdest du deine Stimmung beschreiben?",
      suggestionHappened: "Erkläre in einem Satz, was heute passiert ist.",
      suggestionDirections: "Wie würdest du in {location} nach dem Weg fragen?",
      suggestionFood: "Was hast du heute gegessen?",
      suggestionMusic: "Welches Lied hörst du zurzeit oft?",
      inputPlaceholder: "Ich wollte gestern früher schlafen gehen, aber ich war zu lange am Handy.",
      mic: "Mikro",
      recording: "Aufnahme",
      recordAria: "Sprachnotiz aufnehmen",
      useSample: "Beispiel nutzen",
      send: "Senden",
      loadingMessage: "Dein Satz wird natürlich verarbeitet ...",
      errorMessage: "Die KI-Antwort konnte gerade nicht geladen werden. Bitte versuche es noch einmal.",
      tooLongMessage: "Bitte halte deinen Satz unter 500 Zeichen.",
      inputLimit: "Bis zu 500 Zeichen"
    },
    learning: {
      naturalTranslation: "Natürliche Übersetzung",
      literalMeaning: "Wörtliche Bedeutung",
      basedOn: "Ausgehend von",
      simpleGrammar: "Einfache Grammatik",
      usefulChunks: "Nützliche Satzbausteine",
      similarExamples: "Ähnliche Beispiele",
      tryAgain: "Noch einmal versuchen",
      tryPlaceholder: "Versuch es aus dem Gedächtnis und vergleiche dann.",
      compareGently: "Sanft vergleichen",
      saveForReview: "Zum Wiederholen speichern",
      save: "Speichern",
      saved: "Gespeichert",
      compareFeedback: "Gut. Eine natürliche Version ist: {answer} Behalte das Muster und ändere ein Detail aus deinem Leben."
    },
    saved: {
      kicker: "Gespeicherte Bausteine",
      title: "Sätze aus deinem eigenen Leben.",
      intro: "Nativo speichert nützliche Bausteine und Sätze und bringt sie zurück, wenn du sie aus dem Gedächtnis bilden kannst.",
      emptyTitle: "Noch nichts gespeichert.",
      emptyBody: "Sende auf der Startseite einen Satz und speichere die Bausteine, die nützlich wirken.",
      goHome: "Zur Startseite",
      practice: "Üben"
    },
    review: {
      kicker: "Aktives Erinnern",
      title: "Hol dir den Ausdruck selbst zurück.",
      intro: "Die Übung ist einfach: erinnern, sagen und Sprache wiederverwenden, die aus deinen echten Sätzen stammt.",
      compare: "Vergleichen",
      anotherPhrase: "Anderer Ausdruck",
      naturalAnswer: "Natürliche Antwort",
      notice: "Achte auf den Baustein und bilde dann einen neuen Satz über deinen Tag.",
      remembered: "Ich habe mich erinnert",
      needsReview: "Bald wiederholen",
      emptyTitle: "Dein Wiederholungsbereich ist gerade ruhig.",
      emptyBody: "Speichere ein paar Ausdrücke von der Startseite, dann erscheinen sie hier in sinnvollen Abständen.",
      saySomething: "Etwas sagen",
      taskHowSay: "Wie würdest du das sagen?",
      taskUseOwn: "Verwende es in einem eigenen Satz",
      taskSayNaturally: "Sag es natürlich",
      placeholderPhrase: "Schreib oder sag den Ausdruck aus dem Gedächtnis.",
      placeholderPersonal: "Mach daraus etwas Persönliches und Natürliches.",
      placeholderSpeaking: "Tippe, was du gesagt hast, oder nutze den Sprechbereich.",
      savedFrom: "Gespeichert aus: „{source}“",
      contextChange: "Wenn du den Satz veränderst, wird der Ausdruck nutzbar, nicht nur vertraut.",
      contextSpeaking: "Kurzes Abrufen beim Sprechen verringert Zögern.",
      usePhrasePrompt: "Schreib einen neuen Satz mit: {phrase}",
      sayMeaningPrompt: "Nimm auf oder tippe, wie du sagst: {meaning}",
      exampleUsing: "Beispielmuster: {phrase} ..."
    },
    speaking: {
      kicker: "Sprechpraxis",
      title: "Sprich, bevor es perfekt wirkt.",
      intro: "Nimm einen kurzen Gedanken auf. Der Coach konzentriert sich auf eine hilfreiche Verbesserung und lässt den Rest in Ruhe.",
      cardTitle: "Sag einen Satz über deinen Tag.",
      promptTravel: "Versuch: Frag nach etwas, das du auf Reisen brauchst.",
      promptWork: "Versuch: Beschreibe eine Sache, die du heute erledigt hast.",
      promptDefault: "Versuch: Beschreibe deine Pläne für die nächsten Stunden.",
      record: "Sprachnotiz aufnehmen",
      recording: "Aufnahme...",
      transcript: "Transkript",
      transcriptPlaceholder: "Deine Sprachnotiz wird hier transkribiert.",
      analyze: "Sanfte Korrektur geben",
      saveSentence: "Satz speichern",
      naturalVersion: "Natürliche Version",
      improvement: "Eine nützliche Verbesserung",
      mySpokenSentence: "Mein gesprochener Satz",
      correctionTip: "Konzentriere dich auf ein Muster aus dem Satz, statt jedes Detail zu korrigieren.",
      correctionEncouragement: "Das Ziel ist weniger Zögern und mit der Zeit natürlicherer Ausdruck."
    },
    reflection: {
      kicker: "Reflexion",
      title: "Ruhige Zeichen von Fortschritt.",
      intro: "Nativo kann nützliche Muster leise erkennen und sie dir in klarer Sprache zurückspiegeln.",
      cardTitle: "{namePrefix}dein {target} wird alltagstauglicher.",
      reset: "Prototypdaten zurücksetzen",
      patternTitle: "Du baust nützliche Satzmuster auf.",
      patternPast: "Zuletzt ging es um Vergangenheitsformen, zum Beispiel darum, was du wolltest oder was gestern passiert ist.",
      patternSaved: "Deine gespeicherten Ausdrücke zeigen mit der Zeit, welche Muster vertrauter werden.",
      reviewTitle: "Deine Wiederholungen verlangen aktive Sprache.",
      reviewBody: "Du erinnerst, sagst und verwendest Bausteine in neuen persönlichen Sätzen.",
      speakingTitle: "Sprechen bleibt ohne Druck.",
      speakingDone: "Du hast mindestens einen gesprochenen Satz gespeichert, also kann die spätere Praxis zu echter Sprache zurückkehren.",
      speakingReady: "Der Sprechbereich ist bereit, wenn du einen kurzen Gedanken laut üben möchtest."
    },
    timing: {
      ready: "bereit zum Wiederholen",
      laterToday: "kommt später heute zurück",
      inDays: "kommt in etwa {days} Tag{plural} zurück"
    },
    patterns: {
      pastRoutines: "Vergangenheit und Alltag",
      foodRoutines: "Essen und Routinen",
      dailyPlans: "Tagespläne",
      personalExpression: "persönlicher Ausdruck",
      speakingConfidence: "Sicherheit beim Sprechen"
    },
    samples: {
      mainThought: "Ich wollte gestern früher schlafen gehen, aber ich war zu lange am Handy.",
      voiceThought: "Heute Morgen wollte ich Kaffee machen, bevor ich meine Nachrichten checke."
    },
    coach: {
      literalSample: "Sehr nah an: Gestern wollte ich früher ins Bett gehen, aber ich habe zu viel Zeit mit meinem Handy verbracht.",
      grammarSample: "In {target} nutzt der Satz eine natürliche Vergangenheitsform für „wollte“ und einen eigenen Ausdruck für „zu viel Zeit verbringen“. Achte auf das Muster, nicht auf jedes einzelne Wort.",
      trySample: "Wie würdest du sagen: „Ich wollte gestern lernen, aber ich war zu müde“?",
      foodGrammar: "Ein kurzer Zukunfts- oder Nähe-Zukunfts-Ausdruck reicht hier. Lerne die Wendung als Baustein, nicht Wort für Wort.",
      foodTry: "Wie würdest du sagen: „Ich werde heute Abend etwas Einfaches kochen“?",
      plansGrammar: "Dieses Muster ist nützlich für Pläne und Wünsche. Halte den Satz einfach und ändere dann ein Detail aus deinem Tag.",
      plansTry: "Wie würdest du sagen: „Heute möchte ich mich nach der Arbeit ausruhen“?",
      fallbackLiteral: "Die genaue KI-Übersetzung würde hier erscheinen. Dieser Prototyp zeigt die Lernstruktur.",
      fallbackGrammar: "Der Coach würde ein nützliches Muster aus deinem Satz auswählen und die Erklärung kurz halten.",
      fallbackTry: "Sag einen ähnlichen Satz über dein eigenes Leben, ohne hinzuschauen.",
      chunkMeanings: {
        wantedBed: "ich wollte schlafen gehen",
        earlier: "früher",
        spentTooLong: "ich habe zu viel Zeit verbracht",
        onPhone: "am Handy",
        goingToEat: "ich werde essen",
        somethingSimple: "etwas Einfaches",
        today: "heute",
        todayIWant: "heute möchte ich",
        finishWork: "die Arbeit beenden",
        goForWalk: "spazieren gehen",
        wantToSayThis: "ich möchte das sagen",
        naturalWay: "auf natürliche Weise",
        simple: "einfach"
      }
    }
  },
  es: {
    documentTitle: "Nativo - Prototipo de coach lingüístico",
    welcome: {
      title: "Aprende un idioma con tus propias palabras.",
      body: "Di algo real. Recibe una traducción natural, una explicación útil y frases que merece la pena recordar.",
      start: "Empezar"
    },
    nav: {
      aria: "Pantallas de Nativo",
      goHome: "Ir al inicio",
      home: "Inicio",
      saved: "Guardado",
      review: "Repasar",
      speaking: "Hablar",
      reflection: "Reflexión"
    },
    onboarding: {
      title: "Un poco de contexto basta.",
      body: "Así el coach puede sugerir frases que encajen con tu día. Unos pocos datos son suficientes.",
      name: "Nombre",
      age: "Edad",
      nativeLanguage: "Lengua materna",
      targetLanguage: "Idioma objetivo",
      currentLevel: "Nivel actual",
      optional: "opcional",
      location: "Ciudad o ubicación",
      interests: "Intereses",
      reason: "Motivo para aprender",
      reasonPlaceholder: "Quiero sentirme cómodo hablando cuando viajo.",
      localNote: "Nativo guarda esto localmente en tu navegador para que las sugerencias sean más personales.",
      begin: "Comenzar"
    },
    levels: {
      beginner: "Principiante",
      elementary: "Básico",
      intermediate: "Intermedio",
      advanced: "Avanzado"
    },
    interests: {
      travel: "Viajes",
      food: "Comida",
      work: "Trabajo",
      university: "Universidad",
      dating: "Citas",
      sports: "Deporte",
      music: "Música",
      culture: "Cultura"
    },
    home: {
      context: "{namePrefix}una frase real en {target}.",
      promptDefault: "¿Qué quieres decir hoy?",
      promptLunch: "¿Qué estás comiendo o pensando ahora?",
      promptWork: "¿Qué pasó hoy en el trabajo?",
      promptEvening: "¿Qué pasó hoy?",
      helper: "Escríbelo en {native}, dilo en voz alta o empieza con una versión aproximada en {target}.",
      promptIdeas: "Ideas para empezar",
      suggestionPlans: "¿Qué planes tienes hoy?",
      suggestionMood: "¿Cómo describirías tu estado de ánimo?",
      suggestionHappened: "Explica en una frase qué pasó hoy.",
      suggestionDirections: "¿Cómo pedirías direcciones en {location}?",
      suggestionFood: "¿Qué comiste hoy?",
      suggestionMusic: "¿Qué canción has estado escuchando últimamente?",
      inputPlaceholder: "Ayer quería dormir más temprano, pero estuve demasiado tiempo con el móvil.",
      mic: "Micro",
      recording: "Grabando",
      recordAria: "Grabar una nota de voz",
      useSample: "Usar ejemplo",
      send: "Enviar",
      loadingMessage: "Tu frase se está procesando de forma natural ...",
      errorMessage: "La respuesta de la IA no se pudo cargar ahora. Inténtalo de nuevo.",
      tooLongMessage: "Mantén tu frase por debajo de 500 caracteres.",
      inputLimit: "Hasta 500 caracteres"
    },
    learning: {
      naturalTranslation: "Traducción natural",
      literalMeaning: "Significado literal",
      basedOn: "Basado en",
      simpleGrammar: "Gramática sencilla",
      usefulChunks: "Frases útiles",
      similarExamples: "Ejemplos similares",
      tryAgain: "Inténtalo de nuevo",
      tryPlaceholder: "Inténtalo de memoria y luego compara.",
      compareGently: "Comparar con calma",
      saveForReview: "Guardar para repasar",
      save: "Guardar",
      saved: "Guardado",
      compareFeedback: "Bien. Una versión natural es: {answer} Mantén el patrón y cambia un detalle de tu vida."
    },
    saved: {
      kicker: "Frases guardadas",
      title: "Frases de tu propia vida.",
      intro: "Nativo guarda frases y estructuras útiles, y las trae de vuelta cuando están listas para producirse de memoria.",
      emptyTitle: "Todavía no hay nada guardado.",
      emptyBody: "Envía una frase en la pantalla de inicio y guarda las partes que te parezcan útiles.",
      goHome: "Ir al inicio",
      practice: "Practicar"
    },
    review: {
      kicker: "Recuerdo activo",
      title: "Recupera la frase tú mismo.",
      intro: "El trabajo es sencillo: recordar, decir y reutilizar lenguaje que ya salió de tus frases reales.",
      compare: "Comparar",
      anotherPhrase: "Otra frase",
      naturalAnswer: "Respuesta natural",
      notice: "Fíjate en la frase y luego prueba una oración nueva sobre tu día.",
      remembered: "La recordé",
      needsReview: "Traerla pronto",
      emptyTitle: "Tu espacio de repaso está tranquilo ahora.",
      emptyBody: "Guarda algunas frases desde el inicio y volverán aquí en intervalos útiles.",
      saySomething: "Decir algo",
      taskHowSay: "¿Cómo dirías esto?",
      taskUseOwn: "Úsalo en una frase tuya",
      taskSayNaturally: "Dilo de forma natural",
      placeholderPhrase: "Escribe o di la frase de memoria.",
      placeholderPersonal: "Hazlo personal y natural.",
      placeholderSpeaking: "Escribe lo que dijiste o usa la pantalla de habla.",
      savedFrom: "Guardado de: «{source}»",
      contextChange: "Cambiar la frase ayuda a que sea utilizable, no solo familiar.",
      contextSpeaking: "Recordar en voz alta reduce la duda al hablar.",
      usePhrasePrompt: "Escribe una frase nueva usando: {phrase}",
      sayMeaningPrompt: "Graba o escribe cómo dirías: {meaning}",
      exampleUsing: "Patrón de ejemplo: {phrase} ..."
    },
    speaking: {
      kicker: "Práctica oral",
      title: "Empieza a hablar antes de que parezca perfecto.",
      intro: "Graba un pensamiento corto. El coach se centra en una mejora importante y deja lo demás tranquilo.",
      cardTitle: "Di una frase sobre tu día.",
      promptTravel: "Prueba: pide algo que necesitarías al viajar.",
      promptWork: "Prueba: describe algo que terminaste hoy.",
      promptDefault: "Prueba: describe tus planes para las próximas horas.",
      record: "Grabar nota de voz",
      recording: "Grabando...",
      transcript: "Transcripción",
      transcriptPlaceholder: "Tu nota de voz se transcribirá aquí.",
      analyze: "Dar corrección suave",
      saveSentence: "Guardar frase",
      naturalVersion: "Versión natural",
      improvement: "Una mejora útil",
      mySpokenSentence: "Mi frase hablada",
      correctionTip: "Concéntrate en un patrón de la frase en vez de corregir cada detalle.",
      correctionEncouragement: "El objetivo es dudar menos y expresarte con más naturalidad con el tiempo."
    },
    reflection: {
      kicker: "Reflexión",
      title: "Señales tranquilas de avance.",
      intro: "Nativo puede notar patrones útiles en silencio y devolvértelos con palabras sencillas.",
      cardTitle: "{namePrefix}tu {target} se está volviendo más usable.",
      reset: "Restablecer datos del prototipo",
      patternTitle: "Estás construyendo patrones de frases útiles.",
      patternPast: "Las frases recientes incluyen ideas en pasado, como hablar de lo que querías o de lo que pasó ayer.",
      patternSaved: "Tus frases guardadas mostrarán qué patrones se vuelven más familiares con el tiempo.",
      reviewTitle: "Tus repasos te piden producir lenguaje.",
      reviewBody: "Recuerdas, dices y reutilizas frases en nuevas oraciones personales.",
      speakingTitle: "La práctica oral sigue siendo tranquila.",
      speakingDone: "Guardaste al menos una frase hablada, así que la práctica futura puede volver a lenguaje que intentaste decir.",
      speakingReady: "La pantalla de habla está lista cuando quieras practicar un pensamiento corto en voz alta."
    },
    timing: {
      ready: "lista para repasar",
      laterToday: "vuelve más tarde hoy",
      inDays: "vuelve en aproximadamente {days} día{plural}"
    },
    patterns: {
      pastRoutines: "pasado y rutinas",
      foodRoutines: "comida y rutinas",
      dailyPlans: "planes diarios",
      personalExpression: "expresión personal",
      speakingConfidence: "confianza al hablar"
    },
    samples: {
      mainThought: "Ayer quería dormir más temprano, pero estuve demasiado tiempo con el móvil.",
      voiceThought: "Esta mañana quería hacer café antes de revisar mis mensajes."
    },
    coach: {
      literalSample: "Muy cerca de: ayer quería acostarme más temprano, pero pasé demasiado tiempo con el móvil.",
      grammarSample: "En {target}, esta frase usa una forma natural del pasado para “quería” y una expresión separada para pasar demasiado tiempo. Fíjate en el patrón, no en cada palabra.",
      trySample: "¿Cómo dirías: «Ayer quería estudiar, pero estaba demasiado cansado»?",
      foodGrammar: "Aquí basta con una forma corta de futuro o futuro cercano. Aprende la expresión como un bloque, no palabra por palabra.",
      foodTry: "¿Cómo dirías: «Voy a cocinar algo sencillo esta noche»?",
      plansGrammar: "Este patrón sirve para planes y deseos. Mantén la frase simple y cambia un detalle de tu día.",
      plansTry: "¿Cómo dirías: «Hoy quiero descansar después del trabajo»?",
      fallbackLiteral: "La traducción exacta de la IA aparecería aquí. Este prototipo muestra la estructura de aprendizaje.",
      fallbackGrammar: "El coach elegiría un patrón útil de tu frase y mantendría la explicación breve.",
      fallbackTry: "Di una frase similar sobre tu propia vida sin mirar.",
      chunkMeanings: {
        wantedBed: "quería acostarme",
        earlier: "más temprano",
        spentTooLong: "pasé demasiado tiempo",
        onPhone: "con el móvil",
        goingToEat: "voy a comer",
        somethingSimple: "algo sencillo",
        today: "hoy",
        todayIWant: "hoy quiero",
        finishWork: "terminar el trabajo",
        goForWalk: "dar un paseo",
        wantToSayThis: "quiero decir esto",
        naturalWay: "de forma natural",
        simple: "sencillo"
      }
    }
  },
  it: {
    documentTitle: "Nativo - Prototipo di coach linguistico",
    welcome: {
      title: "Impara una lingua con le tue parole.",
      body: "Di qualcosa di reale. Ricevi una traduzione naturale, una spiegazione utile e frasi da ricordare.",
      start: "Inizia"
    },
    nav: {
      aria: "Schermate di Nativo",
      goHome: "Vai alla home",
      home: "Home",
      saved: "Salvati",
      review: "Ripasso",
      speaking: "Parla",
      reflection: "Riflessione"
    },
    onboarding: {
      title: "Basta un po' di contesto.",
      body: "Così il coach può suggerire frasi adatte alla tua giornata. Pochi dettagli sono sufficienti.",
      name: "Nome",
      age: "Età",
      nativeLanguage: "Lingua madre",
      targetLanguage: "Lingua obiettivo",
      currentLevel: "Livello attuale",
      optional: "opzionale",
      location: "Città o luogo",
      interests: "Interessi",
      reason: "Motivo per cui impari",
      reasonPlaceholder: "Voglio sentirmi a mio agio quando parlo in viaggio.",
      localNote: "Nativo salva questi dati localmente nel browser, così i suggerimenti possono essere più personali.",
      begin: "Comincia"
    },
    levels: {
      beginner: "Principiante",
      elementary: "Base",
      intermediate: "Intermedio",
      advanced: "Avanzato"
    },
    interests: {
      travel: "Viaggi",
      food: "Cibo",
      work: "Lavoro",
      university: "Università",
      dating: "Dating",
      sports: "Sport",
      music: "Musica",
      culture: "Cultura"
    },
    home: {
      context: "{namePrefix}una frase reale in {target}.",
      promptDefault: "Cosa vuoi dire oggi?",
      promptLunch: "Cosa stai mangiando o pensando adesso?",
      promptWork: "Cosa è successo oggi al lavoro?",
      promptEvening: "Cosa è successo oggi?",
      helper: "Scrivilo in {native}, dillo ad alta voce o prova una prima versione in {target}.",
      promptIdeas: "Idee per iniziare",
      suggestionPlans: "Quali sono i tuoi programmi per oggi?",
      suggestionMood: "Come descriveresti il tuo umore?",
      suggestionHappened: "Spiega in una frase cosa è successo oggi.",
      suggestionDirections: "Come chiederesti indicazioni a {location}?",
      suggestionFood: "Cosa hai mangiato oggi?",
      suggestionMusic: "Che canzone stai ascoltando ultimamente?",
      inputPlaceholder: "Ieri volevo andare a dormire prima, ma sono rimasto troppo tempo al telefono.",
      mic: "Mic",
      recording: "Registrando",
      recordAria: "Registra una nota vocale",
      useSample: "Usa esempio",
      send: "Invia",
      loadingMessage: "La tua frase viene elaborata in modo naturale ...",
      errorMessage: "La risposta dell'IA non può essere caricata ora. Riprova.",
      tooLongMessage: "Tieni la frase sotto i 500 caratteri.",
      inputLimit: "Fino a 500 caratteri"
    },
    learning: {
      naturalTranslation: "Traduzione naturale",
      literalMeaning: "Significato letterale",
      basedOn: "Basato su",
      simpleGrammar: "Grammatica semplice",
      usefulChunks: "Espressioni utili",
      similarExamples: "Esempi simili",
      tryAgain: "Riprova",
      tryPlaceholder: "Prova a memoria, poi confronta.",
      compareGently: "Confronta con calma",
      saveForReview: "Salva per il ripasso",
      save: "Salva",
      saved: "Salvato",
      compareFeedback: "Bene. Una versione naturale è: {answer} Mantieni il modello e cambia un dettaglio della tua vita."
    },
    saved: {
      kicker: "Espressioni salvate",
      title: "Frasi dalla tua vita.",
      intro: "Nativo salva espressioni e frasi utili, poi le riporta quando sono pronte per essere prodotte a memoria.",
      emptyTitle: "Non hai ancora salvato nulla.",
      emptyBody: "Invia una frase dalla home e salva le parti che ti sembrano utili.",
      goHome: "Vai alla home",
      practice: "Esercitati"
    },
    review: {
      kicker: "Richiamo attivo",
      title: "Recupera tu l'espressione.",
      intro: "Il lavoro è semplice: ricordare, dire e riusare lingua nata dalle tue frasi reali.",
      compare: "Confronta",
      anotherPhrase: "Altra espressione",
      naturalAnswer: "Risposta naturale",
      notice: "Nota l'espressione, poi prova una nuova frase sulla tua giornata.",
      remembered: "Me la ricordavo",
      needsReview: "Ripresentala presto",
      emptyTitle: "Il tuo spazio di ripasso è tranquillo per ora.",
      emptyBody: "Salva qualche frase dalla home e tornerà qui a intervalli utili.",
      saySomething: "Di qualcosa",
      taskHowSay: "Come lo diresti?",
      taskUseOwn: "Usalo in una frase tua",
      taskSayNaturally: "Dillo in modo naturale",
      placeholderPhrase: "Scrivi o di' l'espressione a memoria.",
      placeholderPersonal: "Rendila personale e naturale.",
      placeholderSpeaking: "Scrivi quello che hai detto oppure usa la schermata Parla.",
      savedFrom: "Salvato da: “{source}”",
      contextChange: "Cambiare la frase rende l'espressione utilizzabile, non solo familiare.",
      contextSpeaking: "Il richiamo parlato breve riduce l'esitazione.",
      usePhrasePrompt: "Scrivi una frase nuova usando: {phrase}",
      sayMeaningPrompt: "Registra o scrivi come diresti: {meaning}",
      exampleUsing: "Modello di esempio: {phrase} ..."
    },
    speaking: {
      kicker: "Pratica orale",
      title: "Inizia a parlare prima che sembri perfetto.",
      intro: "Registra un pensiero breve. Il coach si concentra su un miglioramento utile e lascia stare il resto.",
      cardTitle: "Di' una frase sulla tua giornata.",
      promptTravel: "Prova: chiedi qualcosa che ti servirebbe in viaggio.",
      promptWork: "Prova: descrivi una cosa che hai finito oggi.",
      promptDefault: "Prova: descrivi i tuoi programmi per le prossime ore.",
      record: "Registra nota vocale",
      recording: "Registrando...",
      transcript: "Trascrizione",
      transcriptPlaceholder: "La tua nota vocale verrà trascritta qui.",
      analyze: "Dai una correzione gentile",
      saveSentence: "Salva frase",
      naturalVersion: "Versione naturale",
      improvement: "Un miglioramento utile",
      mySpokenSentence: "La mia frase parlata",
      correctionTip: "Concentrati su un modello della frase invece di correggere ogni dettaglio.",
      correctionEncouragement: "L'obiettivo è esitare meno e, con il tempo, esprimerti in modo più naturale."
    },
    reflection: {
      kicker: "Riflessione",
      title: "Segnali tranquilli di crescita.",
      intro: "Nativo può notare in silenzio i modelli utili e restituirteli in parole semplici.",
      cardTitle: "{namePrefix}il tuo {target} sta diventando più usabile.",
      reset: "Reimposta dati del prototipo",
      patternTitle: "Stai costruendo modelli di frase utili.",
      patternPast: "Le frasi recenti includono idee al passato, come parlare di ciò che volevi o di ciò che è successo ieri.",
      patternSaved: "Le frasi salvate mostreranno quali modelli stanno diventando più familiari nel tempo.",
      reviewTitle: "I ripassi ti chiedono di produrre lingua.",
      reviewBody: "Ricordi, dici e riusi espressioni in nuove frasi personali.",
      speakingTitle: "La pratica orale resta senza pressione.",
      speakingDone: "Hai salvato almeno una frase parlata, quindi la pratica futura può tornare a lingua che hai provato davvero a dire.",
      speakingReady: "La schermata Parla è pronta quando vuoi esercitare un pensiero breve ad alta voce."
    },
    timing: {
      ready: "pronta per il ripasso",
      laterToday: "torna più tardi oggi",
      inDays: "torna tra circa {days} giorn{plural}"
    },
    patterns: {
      pastRoutines: "passato e routine",
      foodRoutines: "cibo e routine",
      dailyPlans: "programmi quotidiani",
      personalExpression: "espressione personale",
      speakingConfidence: "sicurezza nel parlare"
    },
    samples: {
      mainThought: "Ieri volevo andare a dormire prima, ma sono rimasto troppo tempo al telefono.",
      voiceThought: "Stamattina volevo fare il caffè prima di controllare i messaggi."
    },
    coach: {
      literalSample: "Molto vicino a: ieri volevo andare a letto prima, ma ho passato troppo tempo al telefono.",
      grammarSample: "In {target}, questa frase usa una forma naturale del passato per “volevo” e un'espressione separata per passare troppo tempo. Nota il modello, non ogni parola.",
      trySample: "Come diresti: “Ieri volevo studiare, ma ero troppo stanco”?",
      foodGrammar: "Qui basta un futuro breve o una forma vicina al futuro. Impara l'espressione come blocco, non parola per parola.",
      foodTry: "Come diresti: “Stasera cucinerò qualcosa di semplice”?",
      plansGrammar: "Questo modello è utile per piani e desideri. Tieni la frase semplice e cambia un dettaglio della tua giornata.",
      plansTry: "Come diresti: “Oggi voglio riposare dopo il lavoro”?",
      fallbackLiteral: "La traduzione esatta dell'IA apparirebbe qui. Questo prototipo mostra la struttura di apprendimento.",
      fallbackGrammar: "Il coach sceglierebbe un modello utile dalla tua frase e manterrebbe breve la spiegazione.",
      fallbackTry: "Di' una frase simile sulla tua vita senza guardare.",
      chunkMeanings: {
        wantedBed: "volevo andare a dormire",
        earlier: "prima",
        spentTooLong: "ho passato troppo tempo",
        onPhone: "al telefono",
        goingToEat: "sto per mangiare",
        somethingSimple: "qualcosa di semplice",
        today: "oggi",
        todayIWant: "oggi voglio",
        finishWork: "finire il lavoro",
        goForWalk: "fare una passeggiata",
        wantToSayThis: "voglio dire questo",
        naturalWay: "in modo naturale",
        simple: "semplice"
      }
    }
  },
  fr: {
    documentTitle: "Nativo - Prototype de coach linguistique",
    welcome: {
      title: "Apprends une langue avec tes propres mots.",
      body: "Dis quelque chose de réel. Reçois une traduction naturelle, une explication utile et des expressions à retenir.",
      start: "Commencer"
    },
    nav: {
      aria: "Écrans Nativo",
      goHome: "Aller à l'accueil",
      home: "Accueil",
      saved: "Enregistré",
      review: "Réviser",
      speaking: "Parler",
      reflection: "Bilan"
    },
    onboarding: {
      title: "Un peu de contexte suffit.",
      body: "Cela aide le coach à proposer des phrases adaptées à ta journée. Quelques détails suffisent.",
      name: "Prénom",
      age: "Âge",
      nativeLanguage: "Langue maternelle",
      targetLanguage: "Langue cible",
      currentLevel: "Niveau actuel",
      optional: "facultatif",
      location: "Ville ou lieu",
      interests: "Centres d'intérêt",
      reason: "Raison d'apprendre",
      reasonPlaceholder: "Je veux me sentir à l'aise pour parler quand je voyage.",
      localNote: "Nativo garde cela localement dans ton navigateur pour rendre les prompts plus personnels.",
      begin: "Commencer"
    },
    levels: {
      beginner: "Débutant",
      elementary: "Élémentaire",
      intermediate: "Intermédiaire",
      advanced: "Avancé"
    },
    interests: {
      travel: "Voyage",
      food: "Cuisine",
      work: "Travail",
      university: "Université",
      dating: "Rencontres",
      sports: "Sport",
      music: "Musique",
      culture: "Culture"
    },
    home: {
      context: "{namePrefix}une vraie phrase en {target}.",
      promptDefault: "Que veux-tu dire aujourd'hui ?",
      promptLunch: "Qu'est-ce que tu manges ou penses maintenant ?",
      promptWork: "Qu'est-ce qui s'est passé au travail aujourd'hui ?",
      promptEvening: "Qu'est-ce qui s'est passé aujourd'hui ?",
      helper: "Écris-le en {native}, dis-le à voix haute ou tente une version approximative en {target}.",
      promptIdeas: "Idées de prompts",
      suggestionPlans: "Quels sont tes plans aujourd'hui ?",
      suggestionMood: "Comment décrirais-tu ton humeur ?",
      suggestionHappened: "Explique en une phrase ce qui s'est passé aujourd'hui.",
      suggestionDirections: "Comment demanderais-tu ton chemin à {location} ?",
      suggestionFood: "Qu'as-tu mangé aujourd'hui ?",
      suggestionMusic: "Quelle chanson écoutes-tu beaucoup en ce moment ?",
      inputPlaceholder: "Hier, je voulais me coucher plus tôt, mais je suis resté trop longtemps sur mon téléphone.",
      mic: "Micro",
      recording: "Enregistrement",
      recordAria: "Enregistrer un mémo vocal",
      useSample: "Utiliser l'exemple",
      send: "Envoyer",
      loadingMessage: "Ta phrase est traitée naturellement ...",
      errorMessage: "La réponse de l'IA n'a pas pu être chargée pour le moment. Réessaie.",
      tooLongMessage: "Garde ta phrase sous 500 caractères.",
      inputLimit: "Jusqu'à 500 caractères"
    },
    learning: {
      naturalTranslation: "Traduction naturelle",
      literalMeaning: "Sens littéral",
      basedOn: "À partir de",
      simpleGrammar: "Grammaire simple",
      usefulChunks: "Expressions utiles",
      similarExamples: "Exemples similaires",
      tryAgain: "Réessaie",
      tryPlaceholder: "Essaie de mémoire, puis compare.",
      compareGently: "Comparer doucement",
      saveForReview: "Enregistrer pour réviser",
      save: "Enregistrer",
      saved: "Enregistré",
      compareFeedback: "Bien. Une version naturelle est : {answer} Garde le modèle et change un détail de ta vie."
    },
    saved: {
      kicker: "Expressions enregistrées",
      title: "Des phrases de ta propre vie.",
      intro: "Nativo enregistre les expressions et phrases utiles, puis les fait revenir quand elles sont prêtes à être produites de mémoire.",
      emptyTitle: "Rien n'est encore enregistré.",
      emptyBody: "Envoie une phrase depuis l'accueil et enregistre les parties qui te semblent utiles.",
      goHome: "Aller à l'accueil",
      practice: "Pratiquer"
    },
    review: {
      kicker: "Rappel actif",
      title: "Retrouve l'expression toi-même.",
      intro: "Le travail est simple : se souvenir, dire et réutiliser la langue issue de tes vraies phrases.",
      compare: "Comparer",
      anotherPhrase: "Autre expression",
      naturalAnswer: "Réponse naturelle",
      notice: "Remarque l'expression, puis essaie une nouvelle phrase sur ta journée.",
      remembered: "Je m'en suis souvenu",
      needsReview: "La revoir bientôt",
      emptyTitle: "Ton espace de révision est calme pour l'instant.",
      emptyBody: "Enregistre quelques expressions depuis l'accueil et elles reviendront ici à des intervalles utiles.",
      saySomething: "Dire quelque chose",
      taskHowSay: "Comment dirais-tu cela ?",
      taskUseOwn: "Utilise-la dans ta propre phrase",
      taskSayNaturally: "Dis-la naturellement",
      placeholderPhrase: "Écris ou dis l'expression de mémoire.",
      placeholderPersonal: "Rends-la personnelle et naturelle.",
      placeholderSpeaking: "Tape ce que tu as dit ou utilise l'écran Parler.",
      savedFrom: "Enregistré depuis : « {source} »",
      contextChange: "Changer la phrase rend l'expression utilisable, pas seulement familière.",
      contextSpeaking: "Un rappel oral court réduit l'hésitation.",
      usePhrasePrompt: "Écris une nouvelle phrase avec : {phrase}",
      sayMeaningPrompt: "Enregistre ou tape comment tu dirais : {meaning}",
      exampleUsing: "Modèle d'exemple : {phrase} ..."
    },
    speaking: {
      kicker: "Pratique orale",
      title: "Commence à parler avant que ce soit parfait.",
      intro: "Enregistre une pensée courte. Le coach se concentre sur une amélioration utile et laisse le reste tranquille.",
      cardTitle: "Dis une phrase sur ta journée.",
      promptTravel: "Essaie : demande quelque chose dont tu aurais besoin en voyage.",
      promptWork: "Essaie : décris une chose que tu as terminée aujourd'hui.",
      promptDefault: "Essaie : décris tes plans pour les prochaines heures.",
      record: "Enregistrer un mémo vocal",
      recording: "Enregistrement...",
      transcript: "Transcription",
      transcriptPlaceholder: "Ton mémo vocal sera transcrit ici.",
      analyze: "Donner une correction douce",
      saveSentence: "Enregistrer la phrase",
      naturalVersion: "Version naturelle",
      improvement: "Une amélioration utile",
      mySpokenSentence: "Ma phrase parlée",
      correctionTip: "Concentre-toi sur un seul modèle de la phrase au lieu de corriger chaque détail.",
      correctionEncouragement: "Le but est de moins hésiter et de t'exprimer plus naturellement avec le temps."
    },
    reflection: {
      kicker: "Bilan",
      title: "Des signes calmes de progrès.",
      intro: "Nativo peut remarquer discrètement des modèles utiles, puis te les refléter en langage simple.",
      cardTitle: "{namePrefix}ton {target} devient plus utilisable.",
      reset: "Réinitialiser les données du prototype",
      patternTitle: "Tu construis des modèles de phrase utiles.",
      patternPast: "Les phrases récentes incluent des idées au passé, comme parler de ce que tu voulais ou de ce qui s'est passé hier.",
      patternSaved: "Tes expressions enregistrées montreront quels modèles deviennent plus familiers avec le temps.",
      reviewTitle: "Tes révisions te demandent de produire la langue.",
      reviewBody: "Tu te souviens, tu dis et tu réutilises des expressions dans de nouvelles phrases personnelles.",
      speakingTitle: "La pratique orale reste sans pression.",
      speakingDone: "Tu as enregistré au moins une phrase parlée, donc la pratique future peut revenir à une langue que tu as vraiment essayé de dire.",
      speakingReady: "L'écran Parler est prêt quand tu veux pratiquer une pensée courte à voix haute."
    },
    timing: {
      ready: "prête à réviser",
      laterToday: "revient plus tard aujourd'hui",
      inDays: "revient dans environ {days} jour{plural}"
    },
    patterns: {
      pastRoutines: "passé et routines",
      foodRoutines: "repas et routines",
      dailyPlans: "plans du jour",
      personalExpression: "expression personnelle",
      speakingConfidence: "aisance à l'oral"
    },
    samples: {
      mainThought: "Hier, je voulais me coucher plus tôt, mais je suis resté trop longtemps sur mon téléphone.",
      voiceThought: "Ce matin, je voulais faire du café avant de regarder mes messages."
    },
    coach: {
      literalSample: "Très proche de : hier, je voulais me coucher plus tôt, mais j'ai passé trop de temps sur mon téléphone.",
      grammarSample: "En {target}, cette phrase utilise une forme naturelle du passé pour “je voulais” et une expression séparée pour passer trop de temps. Observe le modèle, pas chaque mot.",
      trySample: "Comment dirais-tu : « Je voulais étudier hier, mais j'étais trop fatigué » ?",
      foodGrammar: "Ici, une forme courte de futur ou de futur proche suffit. Apprends l'expression comme un bloc, pas mot à mot.",
      foodTry: "Comment dirais-tu : « Je vais cuisiner quelque chose de simple ce soir » ?",
      plansGrammar: "Ce modèle sert pour les plans et les envies. Garde la phrase simple, puis change un détail de ta journée.",
      plansTry: "Comment dirais-tu : « Aujourd'hui, je veux me reposer après le travail » ?",
      fallbackLiteral: "La traduction exacte de l'IA apparaîtrait ici. Ce prototype montre la structure d'apprentissage.",
      fallbackGrammar: "Le coach choisirait un modèle utile dans ta phrase et garderait l'explication courte.",
      fallbackTry: "Dis une phrase similaire sur ta propre vie sans regarder.",
      chunkMeanings: {
        wantedBed: "je voulais me coucher",
        earlier: "plus tôt",
        spentTooLong: "j'ai passé trop de temps",
        onPhone: "sur mon téléphone",
        goingToEat: "je vais manger",
        somethingSimple: "quelque chose de simple",
        today: "aujourd'hui",
        todayIWant: "aujourd'hui je veux",
        finishWork: "terminer le travail",
        goForWalk: "faire une promenade",
        wantToSayThis: "je veux dire cela",
        naturalWay: "de façon naturelle",
        simple: "simple"
      }
    }
  }
};

const languageConfig = {
  languages,
  uiTranslations,
  targetLanguageNames
};

const interestOptions = [
  "travel",
  "food",
  "work",
  "university",
  "dating",
  "sports",
  "music",
  "culture"
];

const levelOptions = ["beginner", "elementary", "intermediate", "advanced"];

const app = document.querySelector("#app");
const state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
  if (saved) {
    try {
      return migrateState(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }

  return getDefaultState();
}

function getDefaultState() {
  return {
    screen: "welcome",
    profile: {
      name: "",
      age: "",
      nativeLanguage: "en",
      targetLanguage: "es",
      level: "beginner",
      interests: ["food", "travel"],
      location: "",
      reason: ""
    },
    currentInput: "",
    latestCard: null,
    coachStatus: "idle",
    coachError: "",
    savedChunks: [],
    reviewIndex: 0,
    speaking: {
      transcript: "",
      hasCorrection: false
    },
    reflectionTone: "gentle"
  };
}

function migrateState(input) {
  const defaults = getDefaultState();
  const profile = { ...defaults.profile, ...(input.profile ?? {}) };
  const migrated = {
    ...defaults,
    ...input,
    profile: {
      ...profile,
      nativeLanguage: normalizeLanguageId(profile.nativeLanguage, "en"),
      targetLanguage: normalizeLanguageId(profile.targetLanguage, "es"),
      level: normalizeLevel(profile.level),
      interests: Array.isArray(profile.interests) ? profile.interests : defaults.profile.interests
    },
    latestCard: null,
    coachStatus: input.coachStatus === "loading" ? "idle" : input.coachStatus ?? "idle",
    coachError: typeof input.coachError === "string" ? input.coachError : "",
    speaking: {
      ...defaults.speaking,
      ...(input.speaking ?? {})
    }
  };

  if (!["welcome", "onboarding", "home", "saved", "review", "speaking", "reflection"].includes(migrated.screen)) {
    migrated.screen = "welcome";
  }

  return migrated;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setScreen(screen) {
  state.screen = screen;
  saveState();
  render();
}

function updateProfile(next) {
  state.profile = {
    ...state.profile,
    ...next,
    nativeLanguage: normalizeLanguageId(next.nativeLanguage ?? state.profile.nativeLanguage, "en"),
    targetLanguage: normalizeLanguageId(next.targetLanguage ?? state.profile.targetLanguage, "es"),
    level: normalizeLevel(next.level ?? state.profile.level)
  };
  saveState();
}

function getUiLocale(profile = state.profile) {
  return normalizeLanguageId(profile.nativeLanguage, "en");
}

function t(path, vars = {}, locale = getUiLocale()) {
  const value = getPath(uiTranslations[locale], path) ?? getPath(uiTranslations.en, path) ?? path;
  if (typeof value === "function") {
    return value(vars);
  }
  return interpolate(String(value), vars);
}

function getPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function languageName(languageId, uiLocale = getUiLocale()) {
  const normalized = normalizeLanguageId(languageId, "en");
  return (
    targetLanguageNames[uiLocale]?.[normalized] ??
    targetLanguageNames.en[normalized] ??
    languages.find((language) => language.id === normalized)?.nativeName ??
    normalized
  );
}

function render() {
  const uiLocale = getUiLocale();
  document.documentElement.lang = uiLocale;
  document.title = t("documentTitle", {}, uiLocale);

  if (state.screen === "welcome") {
    app.innerHTML = renderWelcome();
    bindWelcome();
    return;
  }

  if (state.screen === "onboarding") {
    app.innerHTML = renderShell(renderOnboarding(), false);
    bindOnboarding();
    return;
  }

  const content = {
    home: renderHome,
    saved: renderSaved,
    review: renderReview,
    speaking: renderSpeaking,
    reflection: renderReflection
  }[state.screen]?.() ?? renderHome();

  app.innerHTML = renderShell(content, true);
  bindNav();

  const binders = {
    home: bindHome,
    saved: bindSaved,
    review: bindReview,
    speaking: bindSpeaking,
    reflection: bindReflection
  };
  binders[state.screen]?.();
}

function renderWelcome() {
  return `
    <section class="screen bare-screen">
      <div class="welcome-copy">
        <div class="quiet-mark">${APP_NAME}</div>
        <h1>${t("welcome.title")}</h1>
        <p>${t("welcome.body")}</p>
        <button class="primary-button" data-action="start">${t("welcome.start")}</button>
      </div>
    </section>
  `;
}

function bindWelcome() {
  app.querySelector("[data-action='start']").addEventListener("click", () => {
    setScreen("onboarding");
  });
}

function renderShell(content, showNav) {
  return `
    <section class="screen app-shell">
      <header class="topbar">
        <button class="wordmark" data-screen="home" aria-label="${t("nav.goHome")}">
          <span class="wordmark-dot" aria-hidden="true"></span>
          <span>${APP_NAME}</span>
        </button>
        ${showNav ? renderNav() : ""}
      </header>
      <main class="content">${content}</main>
    </section>
  `;
}

function renderNav() {
  const items = [
    ["home", t("nav.home")],
    ["saved", t("nav.saved")],
    ["review", t("nav.review")],
    ["speaking", t("nav.speaking")],
    ["reflection", t("nav.reflection")]
  ];

  return `
    <nav class="nav" aria-label="${t("nav.aria")}">
      ${items
        .map(
          ([screen, label]) => `
            <button class="nav-button ${state.screen === screen ? "active" : ""}" data-screen="${screen}">
              ${label}
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function bindNav() {
  app.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });
}

function renderOnboarding() {
  const profile = state.profile;
  return `
    <section class="onboarding-wrap">
      <form class="onboarding-card" id="onboardingForm">
        <div class="form-heading">
          <h1>${t("onboarding.title")}</h1>
          <p>${t("onboarding.body")}</p>
        </div>
        <div class="form-grid">
          ${field("name", t("onboarding.name"), "text", profile.name, "Maya")}
          ${field("age", t("onboarding.age"), "number", profile.age, "28")}
          ${languageSelect("nativeLanguage", t("onboarding.nativeLanguage"), profile.nativeLanguage)}
          ${languageSelect("targetLanguage", t("onboarding.targetLanguage"), profile.targetLanguage)}
          <label class="field">
            <span>${t("onboarding.currentLevel")}</span>
            <select name="level">
              ${levelOptions
                .map(
                  (level) =>
                    `<option value="${level}" ${profile.level === level ? "selected" : ""}>${t(`levels.${level}`)}</option>`
                )
                .join("")}
            </select>
          </label>
          ${field("location", t("onboarding.location"), "text", profile.location, "Berlin", true)}
          <div class="field full">
            <label>${t("onboarding.interests")}</label>
            <div class="interest-grid">
              ${interestOptions
                .map(
                  (interest) => `
                    <button type="button" class="chip ${profile.interests.includes(interest) ? "active" : ""}" data-interest="${interest}">
                      ${t(`interests.${interest}`)}
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
          <label class="field full">
            <span>${t("onboarding.reason")}</span>
            <textarea name="reason" rows="3" placeholder="${escapeAttribute(t("onboarding.reasonPlaceholder"))}">${escapeHtml(profile.reason)}</textarea>
          </label>
        </div>
        <div class="form-actions">
          <p class="microcopy">${t("onboarding.localNote")}</p>
          <button class="primary-button" type="submit">${t("onboarding.begin")}</button>
        </div>
      </form>
    </section>
  `;
}

function field(name, label, type, value, placeholder, optional = false) {
  return `
    <label class="field">
      <span>${label}${optional ? ` <span class="muted-inline">(${t("onboarding.optional")})</span>` : ""}</span>
      <input name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeAttribute(placeholder)}" ${optional ? "" : "required"} />
    </label>
  `;
}

function languageSelect(name, label, selectedValue) {
  const uiLocale = getUiLocale();
  return `
    <label class="field">
      <span>${label}</span>
      <select name="${name}" data-language-select="${name}">
        ${languages
          .map(
            (language) =>
              `<option value="${language.id}" ${normalizeLanguageId(selectedValue) === language.id ? "selected" : ""}>${languageName(language.id, uiLocale)}</option>`
          )
          .join("")}
      </select>
    </label>
  `;
}

function bindOnboarding() {
  const form = app.querySelector("#onboardingForm");
  const selected = new Set(state.profile.interests);

  app.querySelectorAll("[data-interest]").forEach((button) => {
    button.addEventListener("click", () => {
      const interest = button.dataset.interest;
      if (selected.has(interest)) {
        selected.delete(interest);
      } else {
        selected.add(interest);
      }
      button.classList.toggle("active");
    });
  });

  app.querySelector("[data-language-select='nativeLanguage']").addEventListener("change", () => {
    updateProfile(collectOnboardingForm(form, selected));
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProfile(collectOnboardingForm(form, selected));
    state.currentInput = "";
    state.latestCard = null;
    state.coachStatus = "idle";
    state.coachError = "";
    state.speaking = { transcript: "", hasCorrection: false };
    setScreen("home");
  });
}

function collectOnboardingForm(form, selected) {
  const formData = new FormData(form);
  return {
    name: formData.get("name").trim(),
    age: formData.get("age").trim(),
    nativeLanguage: formData.get("nativeLanguage"),
    targetLanguage: formData.get("targetLanguage"),
    level: formData.get("level"),
    location: formData.get("location").trim(),
    reason: formData.get("reason").trim(),
    interests: Array.from(selected)
  };
}

function renderHome() {
  const profile = state.profile;
  const nativeName = languageName(profile.nativeLanguage);
  const targetName = languageName(profile.targetLanguage);
  const prompt = getDailyPrompt(profile);
  const suggestions = getPromptSuggestions(profile);

  return `
    <section class="home-layout">
      <div class="home-center">
        <div class="home-prompt">
          <p class="context-line">${getGreeting(profile)}</p>
          <h1>${prompt}</h1>
          <p>${t("home.helper", { native: nativeName, target: targetName })}</p>
          <div class="prompt-suggestions" aria-label="${t("home.promptIdeas")}">
            ${suggestions
              .map(
                (suggestion) =>
                  `<button class="prompt-suggestion" type="button" data-suggestion="${escapeAttribute(suggestion)}">${suggestion}</button>`
              )
              .join("")}
          </div>
        </div>
        <form class="thought-card" id="thoughtForm">
          <textarea class="thought-input" name="thought" maxlength="500" placeholder="${escapeAttribute(t("home.inputPlaceholder"))}">${escapeHtml(state.currentInput)}</textarea>
          <div class="thought-actions">
            <div class="left-actions">
              <button class="icon-button" type="button" data-action="voice" aria-label="${t("home.recordAria")}">${t("home.mic")}</button>
              <button class="ghost-button" type="button" data-action="sample">${t("home.useSample")}</button>
            </div>
            <button class="primary-button" type="submit" ${state.coachStatus === "loading" ? "disabled" : ""}>${t("home.send")}</button>
          </div>
          <p class="microcopy" data-input-note>${state.coachError || t("home.inputLimit")}</p>
        </form>
        <div class="learning-zone">
          ${renderCoachResult()}
        </div>
      </div>
    </section>
  `;
}

function bindHome() {
  const form = app.querySelector("#thoughtForm");
  const textarea = form.querySelector("textarea");

  app.querySelectorAll("[data-suggestion]").forEach((button) => {
    button.addEventListener("click", () => {
      textarea.value = button.dataset.suggestion;
      textarea.focus();
    });
  });

  app.querySelector("[data-action='sample']").addEventListener("click", () => {
    textarea.value = t("samples.mainThought");
    textarea.focus();
  });

  const voiceButton = app.querySelector("[data-action='voice']");
  voiceButton.addEventListener("click", () => {
    voiceButton.classList.toggle("recording");
    voiceButton.textContent = voiceButton.classList.contains("recording")
      ? t("home.recording")
      : t("home.mic");
    if (!textarea.value.trim()) {
      textarea.value = t("samples.voiceThought");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = textarea.value.trim();
    if (!text) {
      textarea.focus();
      return;
    }
    if (text.length > 500) {
      state.coachStatus = "error";
      state.coachError = t("home.tooLongMessage");
      saveState();
      render();
      return;
    }

    state.currentInput = text;
    state.latestCard = null;
    state.coachStatus = "loading";
    state.coachError = "";
    saveState();
    render();

    try {
      state.latestCard = await coachService.analyze(text, state.profile);
      state.coachStatus = "idle";
      state.coachError = "";
    } catch {
      state.latestCard = null;
      state.coachStatus = "error";
      state.coachError = t("home.errorMessage");
    }

    saveState();
    render();
    requestAnimationFrame(() => {
      app.querySelector(".learning-card, .status-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  bindLearningCard();
}

function renderCoachResult() {
  if (state.coachStatus === "loading") {
    return renderStatusCard(t("home.loadingMessage"), "loading");
  }

  if (state.coachStatus === "error") {
    return renderStatusCard(state.coachError || t("home.errorMessage"), "error");
  }

  return state.latestCard ? renderLearningCard(state.latestCard) : "";
}

function renderStatusCard(message, status) {
  return `
    <article class="status-card ${status}">
      <p class="plain-text">${message}</p>
    </article>
  `;
}

function renderLearningCard(card) {
  const targetName = languageName(card.targetLocale);
  return `
    <article class="learning-card">
      <div class="learning-header">
        <span>${t("learning.naturalTranslation")}</span>
        <h2>${targetName}: “${card.naturalTranslation}”</h2>
        <p class="muted-text">${t("learning.basedOn")}: “${escapeHtml(card.source)}”</p>
      </div>
      <div class="learning-body">
        ${
          card.literal
            ? learningSection(t("learning.literalMeaning"), `<p class="plain-text">${card.literal}</p>`)
            : ""
        }
        ${learningSection(t("learning.simpleGrammar"), `<p class="plain-text">${card.grammar}</p>`)}
        ${learningSection(
          t("learning.usefulChunks"),
          `<div class="chunk-list">
            ${card.chunks.map((chunk) => renderChunkRow(chunk, card)).join("")}
          </div>`
        )}
        ${learningSection(
          t("learning.similarExamples"),
          `<ul class="example-list">${card.examples.map((example) => `<li>${example}</li>`).join("")}</ul>`
        )}
        ${learningSection(
          t("learning.tryAgain"),
          `<div class="try-panel">
            <p class="plain-text">${card.tryAgain.prompt}</p>
            <textarea class="recall-input" data-try-input placeholder="${escapeAttribute(t("learning.tryPlaceholder"))}"></textarea>
            <div class="right-actions">
              <button class="secondary-button" data-action="check-try" type="button">${t("learning.compareGently")}</button>
              <button class="ghost-button" data-action="save-sentence" type="button">${t("learning.saveForReview")}</button>
            </div>
            <div class="coach-note" data-try-note>${card.tryAgain.answer}</div>
          </div>`
        )}
      </div>
    </article>
  `;
}

function learningSection(label, content) {
  return `
    <section class="learning-section">
      <p class="section-label">${label}</p>
      ${content}
    </section>
  `;
}

function renderChunkRow(chunk, card) {
  const exists = state.savedChunks.some((saved) => saved.target === chunk.target);
  return `
    <div class="chunk-row">
      <div class="chunk-main">
        <span class="chunk-target">${chunk.target}</span>
        <span class="chunk-meaning">${chunk.meaning}</span>
      </div>
      <button class="save-button ${exists ? "saved" : ""}" type="button" data-save-chunk="${escapeAttribute(chunk.target)}" data-meaning="${escapeAttribute(chunk.meaning)}" data-pattern="${escapeAttribute(card.pattern)}" data-language="${card.targetLocale}">
        ${exists ? t("learning.saved") : t("learning.save")}
      </button>
    </div>
  `;
}

function bindLearningCard() {
  if (!state.latestCard) return;

  app.querySelectorAll("[data-save-chunk]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("saved")) return;
      addSavedChunk({
        target: button.dataset.saveChunk,
        meaning: button.dataset.meaning,
        source: state.latestCard.source,
        language: button.dataset.language,
        pattern: button.dataset.pattern
      });
      button.classList.add("saved");
      button.textContent = t("learning.saved");
    });
  });

  app.querySelector("[data-action='check-try']")?.addEventListener("click", () => {
    const note = app.querySelector("[data-try-note]");
    const attempt = app.querySelector("[data-try-input]").value.trim();
    note.textContent = attempt
      ? t("learning.compareFeedback", { answer: state.latestCard.tryAgain.answer })
      : state.latestCard.tryAgain.answer;
    note.classList.add("show");
  });

  app.querySelector("[data-action='save-sentence']")?.addEventListener("click", (event) => {
    addSavedChunk({
      target: state.latestCard.naturalTranslation,
      meaning: state.latestCard.source,
      source: state.latestCard.source,
      language: state.latestCard.targetLocale,
      pattern: state.latestCard.pattern
    });
    event.currentTarget.textContent = t("learning.saved");
  });
}

function addSavedChunk(chunk) {
  const exists = state.savedChunks.some((saved) => saved.target === chunk.target);
  if (exists) return;

  state.savedChunks.unshift({
    id: `${Date.now()}-${slug(chunk.target)}`,
    ...chunk,
    dueAt: Date.now() + 1000 * 60 * 30,
    intervalDays: 1,
    attempts: 0
  });
  saveState();
}

function renderSaved() {
  return `
    <section class="panel-wrap">
      <div class="soft-grid">
        <div>
          <p class="screen-kicker">${t("saved.kicker")}</p>
          <h1 class="screen-title">${t("saved.title")}</h1>
          <p class="screen-intro">${t("saved.intro")}</p>
        </div>
        <article class="soft-card">
          ${
            state.savedChunks.length
              ? `<div class="saved-list">${state.savedChunks.map(renderSavedItem).join("")}</div>`
              : `<div class="empty-state">
                  <p class="plain-text">${t("saved.emptyTitle")}</p>
                  <p class="muted-text">${t("saved.emptyBody")}</p>
                  <button class="secondary-button" data-screen="home">${t("saved.goHome")}</button>
                </div>`
          }
        </article>
      </div>
    </section>
  `;
}

function renderSavedItem(item) {
  return `
    <div class="saved-item">
      <div class="saved-copy">
        <strong>${item.target}</strong>
        <span class="saved-meta">${item.meaning}</span>
        <span class="saved-meta">${patternLabel(item.pattern)} - ${reviewTiming(item)}</span>
      </div>
      <button class="ghost-button" data-practice="${item.id}" type="button">${t("saved.practice")}</button>
    </div>
  `;
}

function bindSaved() {
  app.querySelectorAll("[data-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = state.savedChunks.findIndex((item) => item.id === button.dataset.practice);
      state.reviewIndex = Math.max(0, index);
      setScreen("review");
    });
  });
}

function renderReview() {
  const item = getReviewItem();
  const task = buildReviewTask(item);

  return `
    <section class="panel-wrap">
      <div class="soft-grid">
        <div>
          <p class="screen-kicker">${t("review.kicker")}</p>
          <h1 class="screen-title">${t("review.title")}</h1>
          <p class="screen-intro">${t("review.intro")}</p>
        </div>
        <article class="review-card">
          ${
            item
              ? `
                <div class="review-question">
                  <p class="section-label">${task.type}</p>
                  <h2>${task.prompt}</h2>
                  <p class="muted-text">${task.context}</p>
                </div>
                <textarea class="recall-input" data-review-answer placeholder="${escapeAttribute(task.placeholder)}"></textarea>
                <div class="right-actions">
                  <button class="secondary-button" data-action="reveal-answer" type="button">${t("review.compare")}</button>
                  <button class="ghost-button" data-action="skip-review" type="button">${t("review.anotherPhrase")}</button>
                </div>
                <div class="answer-reveal" data-answer-reveal>
                  <strong>${t("review.naturalAnswer")}:</strong> ${task.answer}
                  <br />
                  <span class="muted-text">${t("review.notice")}</span>
                </div>
                <div class="memory-actions" data-memory-actions>
                  <button class="secondary-button" data-action="remembered" type="button">${t("review.remembered")}</button>
                  <button class="ghost-button" data-action="needs-review" type="button">${t("review.needsReview")}</button>
                </div>
              `
              : `
                <div class="empty-state">
                  <p class="plain-text">${t("review.emptyTitle")}</p>
                  <p class="muted-text">${t("review.emptyBody")}</p>
                  <button class="secondary-button" data-screen="home">${t("review.saySomething")}</button>
                </div>
              `
          }
        </article>
      </div>
    </section>
  `;
}

function bindReview() {
  const reveal = app.querySelector("[data-answer-reveal]");
  const memoryActions = app.querySelector("[data-memory-actions]");

  app.querySelector("[data-action='reveal-answer']")?.addEventListener("click", () => {
    reveal.classList.add("show");
    memoryActions.classList.add("show");
  });

  app.querySelector("[data-action='skip-review']")?.addEventListener("click", () => {
    moveToNextReview();
    render();
  });

  app.querySelector("[data-action='remembered']")?.addEventListener("click", () => {
    updateReviewItem(true);
    render();
  });

  app.querySelector("[data-action='needs-review']")?.addEventListener("click", () => {
    updateReviewItem(false);
    render();
  });
}

function getReviewItem() {
  if (!state.savedChunks.length) return null;
  const due = state.savedChunks
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.dueAt <= Date.now())
    .sort((a, b) => a.item.dueAt - b.item.dueAt);

  if (due.length) {
    state.reviewIndex = due[0].index;
    return due[0].item;
  }

  return state.savedChunks[state.reviewIndex % state.savedChunks.length];
}

function buildReviewTask(item) {
  if (!item) return null;

  const taskKinds = [
    {
      type: t("review.taskHowSay"),
      prompt: item.meaning,
      answer: item.target,
      placeholder: t("review.placeholderPhrase"),
      context: t("review.savedFrom", { source: item.source })
    },
    {
      type: t("review.taskUseOwn"),
      prompt: t("review.usePhrasePrompt", { phrase: item.target }),
      answer: t("review.exampleUsing", { phrase: item.target }),
      placeholder: t("review.placeholderPersonal"),
      context: t("review.contextChange")
    },
    {
      type: t("review.taskSayNaturally"),
      prompt: t("review.sayMeaningPrompt", { meaning: item.meaning }),
      answer: item.target,
      placeholder: t("review.placeholderSpeaking"),
      context: t("review.contextSpeaking")
    }
  ];

  return taskKinds[item.attempts % taskKinds.length];
}

function moveToNextReview() {
  if (!state.savedChunks.length) return;
  state.reviewIndex = (state.reviewIndex + 1) % state.savedChunks.length;
  saveState();
}

function updateReviewItem(remembered) {
  const item = getReviewItem();
  if (!item) return;

  item.attempts += 1;
  if (remembered) {
    item.intervalDays = Math.max(2, Math.round(item.intervalDays * 2.1));
  } else {
    item.intervalDays = 1;
  }
  item.dueAt = Date.now() + item.intervalDays * 24 * 60 * 60 * 1000;
  moveToNextReview();
  saveState();
}

function renderSpeaking() {
  const correction = state.speaking.hasCorrection
    ? coachService.correctSpeech(state.speaking.transcript || speechSample(state.profile.targetLanguage), state.profile)
    : null;

  return `
    <section class="panel-wrap">
      <div class="soft-grid">
        <div>
          <p class="screen-kicker">${t("speaking.kicker")}</p>
          <h1 class="screen-title">${t("speaking.title")}</h1>
          <p class="screen-intro">${t("speaking.intro")}</p>
        </div>
        <article class="speaking-card">
          <div class="speaking-stage">
            <h2>${t("speaking.cardTitle")}</h2>
            <p class="muted-text">${getSpeakingPrompt(state.profile)}</p>
            <button class="voice-button" data-action="toggle-recording" type="button">${t("speaking.record")}</button>
            <label class="field transcript-box">
              <span>${t("speaking.transcript")}</span>
              <textarea data-transcript placeholder="${escapeAttribute(t("speaking.transcriptPlaceholder"))}">${escapeHtml(state.speaking.transcript)}</textarea>
            </label>
            <div class="right-actions">
              <button class="secondary-button" data-action="analyze-speech" type="button">${t("speaking.analyze")}</button>
              <button class="ghost-button" data-action="save-transcript" type="button">${t("speaking.saveSentence")}</button>
            </div>
            <div class="gentle-correction ${correction ? "show" : ""}">
              ${
                correction
                  ? `
                    <p class="section-label">${t("speaking.naturalVersion")}</p>
                    <p class="plain-text">${correction.natural}</p>
                    <p class="section-label">${t("speaking.improvement")}</p>
                    <p class="plain-text">${correction.tip}</p>
                    <p class="muted-text">${correction.encouragement}</p>
                  `
                  : ""
              }
            </div>
          </div>
        </article>
      </div>
    </section>
  `;
}

function bindSpeaking() {
  const recordButton = app.querySelector("[data-action='toggle-recording']");
  const transcript = app.querySelector("[data-transcript]");

  recordButton.addEventListener("click", () => {
    recordButton.classList.toggle("recording");
    recordButton.textContent = recordButton.classList.contains("recording")
      ? t("speaking.recording")
      : t("speaking.record");
    if (!transcript.value.trim()) {
      transcript.value = speechSample(state.profile.targetLanguage);
    }
    state.speaking.transcript = transcript.value.trim();
    saveState();
  });

  transcript.addEventListener("input", () => {
    state.speaking.transcript = transcript.value;
    state.speaking.hasCorrection = false;
    saveState();
  });

  app.querySelector("[data-action='analyze-speech']").addEventListener("click", () => {
    state.speaking.transcript = transcript.value.trim();
    state.speaking.hasCorrection = true;
    saveState();
    render();
  });

  app.querySelector("[data-action='save-transcript']").addEventListener("click", (event) => {
    const text = transcript.value.trim();
    if (!text) return;
    addSavedChunk({
      target: text,
      meaning: t("speaking.mySpokenSentence"),
      source: text,
      language: state.profile.targetLanguage,
      pattern: "speakingConfidence"
    });
    event.currentTarget.textContent = t("learning.saved");
  });
}

function renderReflection() {
  const profile = state.profile;
  const patterns = getReflectionPatterns();
  const namePrefix = profile.name ? `${escapeHtml(profile.name)}, ` : "";

  return `
    <section class="panel-wrap">
      <div class="soft-grid">
        <div>
          <p class="screen-kicker">${t("reflection.kicker")}</p>
          <h1 class="screen-title">${t("reflection.title")}</h1>
          <p class="screen-intro">${t("reflection.intro")}</p>
        </div>
        <article class="reflection-card">
          <h2>${t("reflection.cardTitle", { namePrefix, target: languageName(profile.targetLanguage) })}</h2>
          <div class="reflection-list">
            ${patterns
              .map(
                (pattern) => `
                  <div class="reflection-line">
                    <strong>${pattern.title}</strong>
                    <span>${pattern.body}</span>
                  </div>
                `
              )
              .join("")}
          </div>
          <button class="tiny-reset" data-action="reset-demo" type="button">${t("reflection.reset")}</button>
        </article>
      </div>
    </section>
  `;
}

function bindReflection() {
  app.querySelector("[data-action='reset-demo']").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    Object.assign(state, loadState());
    render();
  });
}

const coachService = {
  async analyze(source, profile) {
    const targetLocale = normalizeLanguageId(profile.targetLanguage, "es");
    const response = await fetch("/.netlify/functions/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userSentence: source,
        nativeLanguage: languageName(profile.nativeLanguage, "en"),
        targetLanguage: languageName(profile.targetLanguage, "en"),
        nativeLanguageCode: normalizeLanguageId(profile.nativeLanguage, "en"),
        targetLanguageCode: targetLocale,
        level: t(`levels.${profile.level}`, {}, getUiLocale(profile))
      })
    });

    if (!response.ok) {
      throw new Error("Coach request failed.");
    }

    const data = await response.json();
    return shapeApiResponse(source, targetLocale, data);
  },

  correctSpeech(_transcript, profile) {
    return {
      natural: speechSample(profile.targetLanguage),
      tip: t("speaking.correctionTip", {}, getUiLocale(profile)),
      encouragement: t("speaking.correctionEncouragement", {}, getUiLocale(profile))
    };
  }
};

function shapeApiResponse(source, targetLocale, data) {
  const chunks = Array.isArray(data.usefulChunks)
    ? data.usefulChunks.slice(0, 5).map((item) => ({
        target: String(item.chunk ?? "").trim(),
        meaning: String(item.meaning ?? "").trim()
      })).filter((item) => item.target && item.meaning)
    : [];

  const examples = Array.isArray(data.similarExamples)
    ? data.similarExamples.slice(0, 3).map((item) => String(item ?? "").trim()).filter(Boolean)
    : [];

  if (!data.naturalTranslation || !chunks.length || !data.tryAgainPrompt) {
    throw new Error("Coach response was incomplete.");
  }

  return {
    source,
    targetLocale,
    naturalTranslation: String(data.naturalTranslation).trim(),
    literal: String(data.literalMeaning ?? "").trim(),
    grammar: String(data.simpleGrammar ?? "").trim(),
    chunks,
    examples,
    tryAgain: {
      prompt: String(data.tryAgainPrompt).trim(),
      answer: String(data.naturalTranslation).trim()
    },
    pattern: "personalExpression"
  };
}

const speechSamples = {
  en: "Yesterday, I wanted to study, but I was too tired.",
  de: "Gestern wollte ich lernen, aber ich war zu müde.",
  es: "Ayer quería estudiar, pero estaba demasiado cansado.",
  it: "Ieri volevo studiare, ma ero troppo stanco.",
  fr: "Hier, je voulais étudier, mais j'étais trop fatigué."
};

function getDailyPrompt(profile) {
  const hour = new Date().getHours();
  const interests = profile.interests || [];
  if (hour < 11) return t("home.promptDefault");
  if (hour < 14) return t("home.promptLunch");
  if (hour < 18 && interests.includes("work")) return t("home.promptWork");
  if (hour < 18) return t("home.promptDefault");
  return t("home.promptEvening");
}

function getGreeting(profile) {
  const namePrefix = profile.name ? `${escapeHtml(profile.name)}, ` : "";
  return t("home.context", { namePrefix, target: languageName(profile.targetLanguage) });
}

function getPromptSuggestions(profile) {
  const suggestions = [
    t("home.suggestionPlans"),
    t("home.suggestionMood"),
    t("home.suggestionHappened")
  ];

  if (profile.location) {
    suggestions[1] = t("home.suggestionDirections", { location: profile.location });
  }

  if (profile.interests?.includes("food")) {
    suggestions[0] = t("home.suggestionFood");
  }

  if (profile.interests?.includes("music")) {
    suggestions[2] = t("home.suggestionMusic");
  }

  return suggestions;
}

function getSpeakingPrompt(profile) {
  if (profile.interests?.includes("travel")) {
    return t("speaking.promptTravel");
  }
  if (profile.interests?.includes("work")) {
    return t("speaking.promptWork");
  }
  return t("speaking.promptDefault");
}

function getReflectionPatterns() {
  const saved = state.savedChunks;
  const hasPast = saved.some((item) => item.pattern === "pastRoutines" || stripDiacritics(item.target).includes("queria"));
  const hasSpeaking = saved.some((item) => item.pattern === "speakingConfidence");

  return [
    {
      title: t("reflection.patternTitle"),
      body: hasPast ? t("reflection.patternPast") : t("reflection.patternSaved")
    },
    {
      title: t("reflection.reviewTitle"),
      body: t("reflection.reviewBody")
    },
    {
      title: t("reflection.speakingTitle"),
      body: hasSpeaking ? t("reflection.speakingDone") : t("reflection.speakingReady")
    }
  ];
}

function reviewTiming(item) {
  const diff = item.dueAt - Date.now();
  if (diff <= 0) return t("timing.ready");
  if (diff < 1000 * 60 * 60 * 24) return t("timing.laterToday");
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const plural = days === 1 ? "" : getUiLocale() === "de" ? "en" : "s";
  if (getUiLocale() === "it") {
    return t("timing.inDays", { days, plural: days === 1 ? "o" : "i" });
  }
  return t("timing.inDays", { days, plural });
}

function patternLabel(pattern) {
  return t(`patterns.${pattern}`) === `patterns.${pattern}` ? pattern : t(`patterns.${pattern}`);
}

function speechSample(languageId) {
  return speechSamples[normalizeLanguageId(languageId, "es")] ?? speechSamples.es;
}

function normalizeLanguageId(value, fallback = "en") {
  if (!value) return fallback;
  const cleaned = stripDiacritics(String(value).trim().toLowerCase());
  const aliases = {
    en: "en",
    eng: "en",
    english: "en",
    englisch: "en",
    ingles: "en",
    inglese: "en",
    anglais: "en",
    de: "de",
    deu: "de",
    german: "de",
    deutsch: "de",
    aleman: "de",
    tedesco: "de",
    allemand: "de",
    es: "es",
    spa: "es",
    spanish: "es",
    spanisch: "es",
    espanol: "es",
    spagnolo: "es",
    espagnol: "es",
    it: "it",
    ita: "it",
    italian: "it",
    italienisch: "it",
    italiano: "it",
    italien: "it",
    fr: "fr",
    fra: "fr",
    fre: "fr",
    french: "fr",
    franzosisch: "fr",
    frances: "fr",
    francese: "fr",
    francais: "fr"
  };
  return aliases[cleaned] ?? fallback;
}

function normalizeLevel(value) {
  if (!value) return "beginner";
  const cleaned = stripDiacritics(String(value).trim().toLowerCase());
  const aliases = {
    beginner: "beginner",
    anfaenger: "beginner",
    anfanger: "beginner",
    principiante: "beginner",
    debutant: "beginner",
    elementary: "elementary",
    grundlagen: "elementary",
    basic: "elementary",
    basico: "elementary",
    base: "elementary",
    elementaire: "elementary",
    intermediate: "intermediate",
    mittelstufe: "intermediate",
    intermedio: "intermediate",
    intermediaire: "intermediate",
    advanced: "advanced",
    fortgeschritten: "advanced",
    avanzado: "advanced",
    avanzato: "advanced",
    avance: "advanced"
  };
  return aliases[cleaned] ?? "beginner";
}

function stripDiacritics(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slug(text) {
  return stripDiacritics(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

render();
