window.onload = function () {
  const source = document.getElementById("source");
  const target = document.getElementById("target");

  if (!source || !target) return;

  target.innerHTML = "";

  for (let i = 0; i < source.options.length; i++) {
    target.appendChild(source.options[i].cloneNode(true));
  }

  target.value = "en";
};

const OPENROUTER_API_KEY = "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";

async function traduireTexte() {
  const texte = document.getElementById("text");
  const source = document.getElementById("source");
  const target = document.getElementById("target");
  const resultat = document.getElementById("result");

  if (!texte || !source || !target || !resultat) {
    alert("Erreur: éléments HTML manquants");
    return;
  }

  if (!texte.value) {
    alert("Veuillez saisir un texte.");
    return;
  }

  resultat.innerHTML = "⏳ Traduction...";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Translate the following text from ${source.value} to ${target.value}. Only return the translation:\n\n${texte.value}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      resultat.innerHTML = "Erreur API : " + (data.error?.message || "inconnue");
      return;
    }

    resultat.innerHTML = data.choices[0].message.content;

  } catch (e) {
    resultat.innerHTML = "Erreur réseau : " + e.message;
     }
