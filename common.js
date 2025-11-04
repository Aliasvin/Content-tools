// Helperfunctie: split regels op enters en maak paragrafen met witruimte
function formatParagraphs(rawText) {
  if (!rawText) return "";
  const lines = rawText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  return lines.map(p => `<p>${p}</p>\n`).join("");
}
