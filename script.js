async function translateText() {
    const text = document.getElementById("text").value;
    const source = document.getElementById("source").value;
    const target = document.getElementById("target").value;

    if (!text.trim()) {
        alert("Veuillez entrer un texte.");
        return;
    }

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

        const data = await response.json();
        document.getElementById("result").innerText = data.translatedText;
    } catch (error) {
        document.getElementById("result").innerText =
            "Erreur lors de la traduction.";
    }
}
