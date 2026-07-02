window.onload = function () {
  const source = document.getElementById("source");
  const target = document.getElementById("target");

  target.innerHTML = "";

  for (let i = 1; i < source.options.length; i++) {
    target.appendChild(source.options[i].cloneNode(true));
  }

  target.value = "en";
};

async function traduireTexte() {
  const texte = document.getElementById("text").value;
  const source = document.getElementById("source").value;
  const target = document.getElementById("target").value;
  const resultat = document.getElementById("result");

  if (!texte) {
    alert("Veuillez saisir un texte.");
    return;
  }

  resultat.innerHTML = "⏳ Traduction...";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + CLE_API_OPENROUTER,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Translate this text from ${source} to ${target}: ${texte}`
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      resultat.innerHTML = "Erreur : " + data.error.message;
      return;
    }

    resultat.innerHTML = data.choices[0].message.content;
  } catch (e) {
    resultat.innerHTML = "Erreur : " + e.message;
  }
  }
