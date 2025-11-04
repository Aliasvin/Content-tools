/* ---------- CATEGORIE TEKST GENERATOR ---------- */
(function () {
  const tab = document.getElementById("tab-category");
  if (!tab) return;

  let merkCount = 0;
  let catSectionCount = 0;

  // ---------- MERKEN ----------
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // verwijder speciale tekens
      .replace(/\s+/g, "-"); // vervang spaties door -
  }

  function addMerkRow() {
    merkCount++;
    const container = tab.querySelector("#cat-merken-container");
    const row = document.createElement("div");
    row.classList.add("merk-row");

    row.innerHTML = `
      <div class="merk-header">
        <h4>Merk ${merkCount}</h4>
        <button class="btn-remove-row" type="button" title="Verwijderen">×</button>
      </div>
      <input type="text" class="merk-naam" placeholder="Merknaam (bijv. Makita)">
      <input type="text" class="merk-categorie" placeholder="Categorie (bijv. afkortzaag)">
      <input type="text" class="merk-link" placeholder="Automatisch gegenereerd..." readonly>
    `;

    container.appendChild(row);

    // Verwijderen
    row.querySelector(".btn-remove-row").addEventListener("click", () => {
      row.remove();
      renumberMerken();
    });

    // Automatisch link genereren
    const merkInput = row.querySelector(".merk-naam");
    const catInput = row.querySelector(".merk-categorie");
    const linkInput = row.querySelector(".merk-link");

    function updateLink() {
      const merk = slugify(merkInput.value);
      const cat = slugify(catInput.value);
      if (merk && cat) {
        linkInput.value = `/${merk}/${cat}.html`;
      } else if (merk) {
        linkInput.value = `/${merk}/`;
      } else {
        linkInput.value = "";
      }
    }

    merkInput.addEventListener("input", updateLink);
    catInput.addEventListener("input", updateLink);
  }

  function renumberMerken() {
    const rows = tab.querySelectorAll(".merk-row");
    rows.forEach((r, i) => {
      const h = r.querySelector("h4");
      if (h) h.textContent = `Merk ${i + 1}`;
    });
    merkCount = rows.length;
  }

  // ---------- SUBSECTIES ----------
  function addCatSection() {
    catSectionCount++;
    const container = tab.querySelector("#cat-sections");
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
    const sections = tab.querySelectorAll(".cat-section-block");
    sections.forEach((s, i) => {
      s.querySelector("h4").textContent = `Subsectie ${i + 1}`;
    });
    catSectionCount = sections.length;
  }

  // ---------- HULPFUNCTIE ----------
  function formatParagraphs(text) {
    return text
      .split(/\n+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p}</p>`)
      .join("\n");
  }

  // ---------- GENEREREN ----------
  function generateCategoryText() {
    const h1 = tab.querySelector("#cat-h1").value.trim();
    const intro = tab.querySelector("#cat-intro").value.trim();
    const merkenRows = tab.querySelectorAll(".merk-row");
    const sections = tab.querySelectorAll(".cat-section-block");

    let html = "";
    if (h1) html += `<h1>${h1}</h1>\n`;
    if (intro) html += formatParagraphs(intro) + "\n<br>\n";

    // merkenlijst
    const merken = [...merkenRows]
      .map(row => {
        const merk = row.querySelector(".merk-naam")?.value.trim();
        const link = row.querySelector(".merk-link")?.value.trim();
        return merk && link
          ? `<a class="tm-link" href="${link}">${merk}</a>`
          : "";
      })
      .filter(Boolean);

    if (merken.length) {
      html += `<p>Populaire merken: ${merken.join(" | ")}</p>\n`;
    }

    // leesmeer-sectie
    html += `<div class="readmore">\n<div class="readmorebtn-show"></div>\n`;

    sections.forEach((section, i) => {
      const type = section.querySelector(".cat-subkop-type").value;
      const subkop = section.querySelector(".cat-subkop").value.trim();
      const paragrafen = section.querySelector(".cat-paragraaf").value.trim();
      const opsomming = section.querySelector(".cat-opsomming").value.trim();

      if (subkop) html += `<${type}>${subkop}</${type}>\n`;
      if (paragrafen) html += formatParagraphs(paragrafen);
      if (opsomming) {
        const items = opsomming
          .split(/\n+/)
          .map(i => i.trim())
          .filter(Boolean);
        html += `<ul>\n${items.map(i => `<li>${i}</li>`).join("\n")}\n</ul>`;
      }

      if (i < sections.length - 1) html += `\n<br>\n`;
    });

    html += `\n<div class="readmorebtn-hide"></div>\n</div>\n`;
    tab.querySelector("#catResult").textContent = html;
  }

  // ---------- LEEGMAKEN ----------
  function clearCategoryFields() {
    tab.querySelectorAll("input[type=text], textarea").forEach(el => (el.value = ""));
    tab.querySelector("#cat-merken-container").innerHTML = "";
    tab.querySelector("#cat-sections").innerHTML = "";
    tab.querySelector("#catResult").textContent = "";
    merkCount = 0;
    catSectionCount = 0;
  }

  // ---------- KOPIEER RESULTAAT ----------
  function copyCategoryResult() {
    const btn = tab.querySelector(".btn-copy");
    const result = tab.querySelector("#catResult").textContent.trim();
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

  // ---------- GLOBAAL MAKEN ----------
  window.addMerkRow = addMerkRow;
  window.addCatSection = addCatSection;
  window.generateCategoryText = generateCategoryText;
  window.clearCategoryFields = clearCategoryFields;
  window.copyCategoryResult = copyCategoryResult;
})();
