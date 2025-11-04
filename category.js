/* ---------- CATEGORIE TEKST GENERATOR ---------- */

function addMerkRow() {
  merkCount++;
  const container = document.getElementById("cat-merken-container");
  const row = document.createElement("div");
  row.classList.add("merk-row");
  row.innerHTML = `
    <div class="merk-header">
      <h4>Merk ${merkCount}</h4>
      <button class="btn-remove-row" type="button" title="Verwijderen">×</button>
    </div>
    <input type="text" class="merk-naam" placeholder="Merknaam (bijv. Makita)">
    <input type="text" class="merk-link" placeholder="Link (bijv. /makita/afkortzaag.html)">
    <button class="btn-remove-row" type="button" title="Verwijderen" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(row);

  // Verwijder functionaliteit
  row.querySelector(".btn-remove-row").addEventListener("click", () => {
    row.remove();
    renumberMerken();
  });
}

function renumberMerken() {
  const rows = document.querySelectorAll("#cat-merken-container .merk-row");
  rows.forEach((r, i) => {
    const title = r.querySelector("h4");
    if (title) title.textContent = `Merk ${i + 1}`;
  });
  merkCount = rows.length;
}

/* Subsecties toevoegen */
let catSectionCount = 0;
function addCatSection() {
  catSectionCount++;
  const container = document.getElementById("cat-sections");
  const div = document.createElement("div");
  div.classList.add("cat-section-block");
  div.innerHTML = `
    <button type="button" class="btn-remove" title="Verwijderen">×</button>
    <h4>Subsectie ${catSectionCount}</h4>

    <label>Subkop (H2 of H3):</label>
    <select class="cat-subkop-type">
      <option value="h2">H2</option>
      <option value="h3">H3</option>
    </select>
    <input type="text" class="cat-subkop" placeholder="Bijv. Waar let je op bij het kopen van een afkortzaag?">

    <label>Paragraaftekst:</label>
    <textarea class="cat-paragraaf" rows="4" placeholder="Elke enter = nieuwe paragraaf."></textarea>

    <label>Opsomming:</label>
    <textarea class="cat-opsomming" rows="4" placeholder="Elke regel = nieuw opsomming-item."></textarea>
  `;
  container.appendChild(div);

  div.querySelector(".btn-remove").addEventListener("click", () => {
    div.remove();
    renumberCatSections();
  });
}

function renumberCatSections() {
  const sections = document.querySelectorAll("#cat-sections .cat-section-block");
  sections.forEach((s, i) => {
    s.querySelector("h4").textContent = `Subsectie ${i + 1}`;
  });
  catSectionCount = sections.length;
}

/* Genereer HTML */
function generateCategoryText() {
  const h1 = document.getElementById("cat-h1").value.trim();
  const intro = document.getElementById("cat-intro").value.trim();

  let html = "";
  if (h1) html += `<h1>${h1}</h1>\n`;
  if (intro) html += formatParagraphs(intro)+'<br>\n';

  // Merken
  const merken = [...document.querySelectorAll("#cat-merken-container .merk-row")].map(row => {
    const naam = row.querySelector(".merk-naam")?.value.trim();
    const link = row.querySelector(".merk-link")?.value.trim();
    return (naam && link) ? `<a class="tm-link" href="${link}">${naam}</a>` : "";
  }).filter(Boolean);

  if (merken.length) {
    html += `<p>Populaire merken: ${merken.join(" | ")}</p>\n`;
  }

  // Lees meer sectie openen
  html += `<div class="readmore">\n<div class="readmorebtn-show"></div>\n`;

  // Subsecties verwerken
const sections = document.querySelectorAll("#cat-sections .cat-section-block");
sections.forEach((section, i) => {
  const type = section.querySelector(".cat-subkop-type").value;
  const subkop = section.querySelector(".cat-subkop").value.trim();
  const paragrafenRaw = section.querySelector(".cat-paragraaf").value.trim();
  const opsommingRaw = section.querySelector(".cat-opsomming").value.trim();

  if (subkop) html += `<${type}>${subkop}</${type}>\n`;

  if (paragrafenRaw) html += formatParagraphs(paragrafenRaw);

  if (opsommingRaw) {
    const items = opsommingRaw.split(/\n+/).map(i => i.trim()).filter(Boolean);
    html += `<ul>\n${items.map(i => `<li>${i}</li>`).join("\n")}\n</ul>\n`;
  }

  // Voeg <br> toe tussen secties, behalve na de laatste
  if (i < sections.length - 1) html += `<br>\n`;
});

  html += `<div class="readmorebtn-hide"></div>\n</div>\n`;

  document.getElementById("catResult").textContent = html;
}

/* Velden leegmaken */
function clearCategoryFields() {
  ["cat-h1","cat-intro"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("cat-merken-container").innerHTML = "";
  document.getElementById("cat-sections").innerHTML = "";
  document.getElementById("catResult").textContent = "";
  catSectionCount = 0;
}

/* Kopieer resultaat */
function copyCategoryResult() {
  const btn = document.querySelector('#tab-category .btn-copy');
  const result = document.getElementById("catResult").textContent.trim();
  if (!result) return;
  navigator.clipboard.writeText(result).then(() => {
    if (btn) {
      btn.textContent = "Copied";
      btn.style.background = "#609942";
      btn.style.color = "#fff";
      setTimeout(() => {
        btn.textContent = "Kopieer HTML";
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    }
  });
}
