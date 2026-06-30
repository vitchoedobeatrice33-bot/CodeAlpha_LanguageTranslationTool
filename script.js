// Remplir automatiquement la liste des langues cibles
window.onload = function () {
    const source = document.getElementById("source");
    const target = document.getElementById("target");

    target.innerHTML = "";

    for (let i = 1; i < source.options.length; i++) {
        target.appendChild(source.options[i].cloneNode(true));
    }

    target.value = "fr";
};

// Traduction
async function translateText() {

    const text = document.getElementById("text").value.trim();
    const source = document.getElementById("source").value;
    const target = document.getElementById("target").value;
    const result = document.getElementById("result");

    if (text === "") {
        alert("Veuillez saisir un texte.");
        return;
    }

    result.innerHTML = "⏳ Traduction en cours...";

    try {

        const response = await fetch("https://libretranslate.com/translate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                q: text,
                source: source,
                target: target,
                format: "text"
            })

        });

        if (!response.ok) {
            throw new Error("Erreur serveur");
        }

        const data = await response.json();

        result.innerHTML = `
            <div class="translation-box">
                ${data.translatedText}
            </div>
        `;

    } catch (error) {

        result.innerHTML =
        "❌ Impossible de traduire. Vérifiez votre connexion Internet ou réessayez plus tard.";

    }

}

// Copier la traduction
function copyTranslation() {

    const text = document.getElementById("result").innerText;

    if (text.trim() === "") {
        alert("Aucune traduction à copier.");
        return;
    }

    navigator.clipboard.writeText(text);

    alert("✅ Traduction copiée.");

}

// Échanger les langues
function swapLanguages() {

    const source = document.getElementById("source");
    const target = document.getElementById("target");

    const temp = source.value;

    source.value = target.value;

    target.value = temp;

            }

        
}
