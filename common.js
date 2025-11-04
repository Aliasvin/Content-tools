// Helperfunctie: split regels op enters en maak paragrafen met witruimte
function formatParagraphs(rawText) {
  if (!rawText) return "";
  const lines = rawText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  return lines.map(p => `<p>${p}</p>\n`).join("");
}

/* ---------- VISUELE FEEDBACK OP "GENEREER" KNOP ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".btn.generate, .generate, .generatesteps");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Genereerd”
      btn.textContent = "Genereerd";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".encrypt");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Encrypted”
      btn.textContent = "Encrypted";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".decrypt");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Decrypted”
      btn.textContent = "Decrypted";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

