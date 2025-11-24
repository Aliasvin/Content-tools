/* ---------- BLOG GENERATOR ---------- */
let sectionCount = 0, faqCount = 0;

/* ---------- Sectie toevoegen ---------- */
function addSection() {
  sectionCount++;
  const container = document.getElementById("sections-container");
  const div = document.createElement("div");
  div.className = "section-block";

  div.innerHTML = `
    <button type="button" class="btn-remove" title="Verwijderen">×</button>
    <h4>Sectie ${sectionCount}</h4>
    
    <label>Subkop (H2):</label>
    <input type="text" class="sectie-titel" placeholder="Bijv. Hoe gebruik je deze machine?">
    
    <label>Paragraaftekst:</label>
    <textarea class="sectie-tekst" rows="3" placeholder="Voeg hier je tekst toe..."></textarea>

    <label>Vetgedrukte titel boven de opsomming (optioneel):</label>
    <input type="text" class="sectie-list-title" placeholder="Bijv. Belangrijkste voordelen">
    
    <label>Opsomming (één punt per regel):</label>
    <textarea class="sectie-lijst" rows="3" placeholder="Bijv. Punt 1"></textarea>
    
    <label>Producten toevoegen?</label>
    <select class="sectie-producten-keuze">
      <option value="nee">Nee</option>
      <option value="ja">Ja</option>
    </select>

    <div class="sectie-producten" style="display:none;">
      <label>Vetgedrukte titel boven producten:</label>
      <input type="text" class="sectie-producttitel" placeholder="Bijv. Onze topkeuze voor dit type machine">
    
      <label>Productcodes (komma of enter gescheiden):</label>
      <textarea class="sectie-productcodes" rows="2" placeholder="Bijv. DDF485Z, DHP482Z, DTD152Z"></textarea>
      <button type="button" class="btn-add-row">+ Productrij toevoegen</button>
    </div>
    <hr>
  `;

  container.appendChild(div);

  // Toggle producten
  div.querySelector(".sectie-producten-keuze").addEventListener("change", (e) => {
    div.querySelector(".sectie-producten").style.display =
      e.target.value === "ja" ? "block" : "none";
  });

  // Nieuwe productrij
  div.querySelector(".btn-add-row").addEventListener("click", () => {
    const box = div.querySelector(".sectie-producten");
    const idx = box.querySelectorAll(".sectie-productcodes").length + 1;
    const row = document.createElement("div");
    row.className = "product-row";
    row.innerHTML = `
      <label>Productcodes (rij ${idx}, komma of enter gescheiden):</label>
      <textarea class="sectie-productcodes" rows="2" placeholder="Bijv. DDF484Z, DHS710Z, DTD153Z"></textarea>
      <button type="button" class="btn-remove-row" title="Verwijderen">×</button>
    `;
    box.insertBefore(row, div.querySelector(".btn-add-row"));
    row.querySelector(".btn-remove-row").addEventListener("click", () => row.remove());
  });

  // Verwijderen van sectie
  div.querySelector(".btn-remove").addEventListener("click", () => {
    div.remove();
    renumberSections();
  });

  renumberSections();

  // Knop altijd direct onder de laatste sectie
  const addButton = document.getElementById("addSectionBtn");
  if (addButton) {
    container.appendChild(addButton);
  }
}

function renumberSections() {
  document.querySelectorAll("#sections-container .section-block").forEach((b, i) => {
    b.querySelector("h4").textContent = "Sectie " + (i + 1);
  });
  sectionCount = document.querySelectorAll("#sections-container .section-block").length;
}

/* ---------- FAQ ---------- */
function addFAQ() {
  faqCount++;
  const c = document.getElementById("faq-container");
  const div = document.createElement("div");
  div.className = "faq-block";
  div.innerHTML = `
    <button type="button" class="btn-remove" title="Verwijderen">×</button>
    <h4>Vraag ${faqCount}</h4>
    <label>Vraag:</label>
    <input type="text" class="faq-vraag" placeholder="Bijv. Hoe werkt dit product?">
    <label>Antwoord:</label>
    <textarea class="faq-antwoord" rows="2" placeholder="Voeg hier het antwoord toe..."></textarea>
    <hr>
  `;
  c.appendChild(div);

  // FAQ verwijderen
  div.querySelector(".btn-remove").addEventListener("click", () => {
    div.remove();
    renumberFAQs();

    // Zorg dat knop altijd onderaan blijft
    const addFAQBtn = document.getElementById("addFaqBtn");
    if (addFAQBtn) c.appendChild(addFAQBtn);
  });

  renumberFAQs();

  // ⭐ Knop direct onder laatste FAQ
  const addFAQBtn = document.getElementById("addFaqBtn");
  if (addFAQBtn) c.appendChild(addFAQBtn);
}

function renumberFAQs() {
  document.querySelectorAll("#faq-container .faq-block").forEach((b, i) => {
    b.querySelector("h4").textContent = "Vraag " + (i + 1);
  });
  faqCount = document.querySelectorAll("#faq-container .faq-block").length;
}

/* ---------- Blog genereren ---------- */
function generateBlog() {
  const h1Title = document.getElementById("h1Title")?.value.trim() || "";
  const intro = document.getElementById("intro").value.trim();

  // Korte samenvatting velden
  const summaryTitle = document.getElementById("summaryTitle")?.value.trim() || "";
  const summaryText = document.getElementById("summaryText")?.value.trim() || "";
  const summaryListTitle = document.getElementById("summaryListTitle")?.value.trim() || "";
  const summaryList = document.getElementById("summaryList")?.value.trim() || "";

  const ctaText = document.getElementById("ctaText").value.trim();
  const ctaLink = document.getElementById("ctaLink").value.trim();

  const blocks = document.querySelectorAll("#sections-container .section-block");
  const titles = document.querySelectorAll(".sectie-titel");

  // ---------- FAQ ----------
  const fq = document.querySelectorAll("#faq-container .faq-vraag");
  const fa = document.querySelectorAll("#faq-container .faq-antwoord");

  let faqItems = "";
  fq.forEach((q, i) => {
    const vraag = q.value.trim();
    const antw = fa[i]?.value.trim() || "";
    if (vraag && antw) {
      faqItems += `  <details>\n    <summary>${vraag}</summary>\n    <p>${antw}</p>\n  </details>\n`;
    }
  });
  const hasFAQ = faqItems.length > 0;

  // ---------- Inhoudsopgave ----------
  let tocItems = [];
  titles.forEach((t, i) => {
    const titel = t.value.trim() || "Sectie " + (i + 1);
    tocItems.push({ id: "sectie" + (i + 1), label: titel });
  });

  let html = "";
  if (h1Title) html += `<h1>${h1Title}</h1>\n`;

  /* ---------- Dynamische korte samenvatting ---------- */
let hasSummaryContent = summaryTitle || summaryText || summaryList;

if (hasSummaryContent) {

  // Titel samenvatting (optioneel)
  if (summaryTitle) {
    html += `<p><strong>${summaryTitle}</strong></p>\n`;
  }

  // Tekst samenvatting (optioneel)
  if (summaryText) {
    html += `<p>${summaryText}</p>\n`;
  }

  // Opsomming samenvatting (optioneel)
  if (summaryList) {
    const items = summaryList
      .split(/\n+/)
      .map(i => i.trim())
      .filter(Boolean);

    if (items.length) {

      // Vetgedrukte titel boven opsomming (alleen meenemen als ingevuld)
      if (summaryListTitle) {
        html += `<p><strong>${summaryListTitle}</strong></p>\n`;
      }

      html += `<ul>\n`;
      items.forEach(i => {
        html += `  <li>${i}</li>\n`;
      });
      html += `</ul>\n`;
    }
  }
}

  if (intro) html += formatParagraphs(intro);

  // ---------- TOC ----------
  if (tocItems.length) {
    html += `<div class="toc-container">\n  <h2>Inhoudsopgave</h2>\n  <ul class="toc">\n`;
    tocItems.forEach((t) => {
      html += `    <li><a class="tm-link" href="#${t.id}">${t.label}</a></li>\n`;
    });
    html += `    <li><a class="tm-link" href="#Assortiment">Ons assortiment</a></li>\n`;
    if (hasFAQ) html += `    <li><a class="tm-link" href="#FAQ">Veelgestelde vragen</a></li>\n`;
    html += `  </ul>\n</div>\n`;
  }

  // ---------- Secties ----------
  blocks.forEach((block, i) => {
    const titel = block.querySelector(".sectie-titel").value || `Sectie ${i + 1}`;
    const par = block.querySelector(".sectie-tekst").value.trim();
    const lijst = block.querySelector(".sectie-lijst").value.trim();
    const listTitle = block.querySelector(".sectie-list-title")?.value.trim() || "";

    const wilProd = block.querySelector(".sectie-producten-keuze").value === "ja";
    const productInputs = block.querySelectorAll(".sectie-productcodes");
    let productRows = [];

    productInputs.forEach((inp) => {
      const codes = inp.value
        .split(/[\n,]+/)
        .map((c) => c.trim())
        .filter(Boolean);
      if (codes.length) productRows.push(codes);
    });

    html += `<section id="sectie${i + 1}">\n  <h2>${titel}</h2>\n`;

    if (par) html += formatParagraphs(par);

    if (lijst) {
      const items = lijst
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean);

      if (items.length) {
        if (listTitle) {
          html += `  <p><strong>${listTitle}</strong></p>\n`;
        }

        html += "  <ul>\n";
        items.forEach((x) => {
          if (x.includes(":")) {
            const [left, right] = x.split(/:(.+)/);
            html += `    <li><strong>${left.trim()}</strong>: ${right.trim()}</li>\n`;
          } else {
            html += `    <li>${x}</li>\n`;
          }
        });
        html += "  </ul>\n  <br>\n";
      }
    }

    if (wilProd && productRows.length) {
      const prodTitle = block.querySelector(".sectie-producttitel")?.value.trim();
      if (prodTitle) html += `  <p><strong>${prodTitle}</strong></p>\n`;

      productRows.forEach((row) => {
        html += "  <blok-horizontaal breedte:100>\n";
        row.forEach((code) => {
          html += `    <blok-horizontaal breedte:30>\n      <product>\n        <productcode>${code}</productcode><includeprice>true</includeprice>\n      </product>\n    </blok-horizontaal>\n`;
        });
        html += "  </blok-horizontaal>\n";
      });
    }

    html += "</section>\n";
  });

  // ---------- CTA-sectie ----------
  html += `<section id="Assortiment">\n  <h2>Ons assortiment</h2>\n  <div class="cta-box">\n    <p>Bekijk ons gehele assortiment aan</p>\n    <div class="cta-wrapper">\n      <a href="${ctaLink}" class="cta-button">${ctaText}</a>\n    </div>\n  </div>\n</section>\n`;

  // ---------- FAQ ----------
  if (hasFAQ) {
    html += `<section id="FAQ">\n  <h2>Veelgestelde vragen</h2>\n${faqItems}</section>\n`;
  }

  // ---------- Navigatie knoppen ----------
  const prevBlog = document.getElementById("prevBlogLink")?.value.trim() || "";
  const nextBlog = document.getElementById("nextBlogLink")?.value.trim() || "";

  if (prevBlog || nextBlog) {
    html += `
<div class="blog-navigation">
  ${prevBlog ? `<a href="${prevBlog}" class="nav-btn prev-btn"><i class="fas fa-arrow-left"></i> Vorige blog</a>` : ""}
  ${nextBlog ? `<a href="${nextBlog}" class="nav-btn next-btn">Volgende blog <i class="fas fa-arrow-right"></i></a>` : ""}
</div>\n
`;
  }

  // style+script minimal (anchors smooth scroll) 
  html += '\n<style>\n' + 
  ' .cta-box{\n' + 
  ' margin:2em 0;\n' + 
  ' padding:1.5em;\n' + 
  ' background:#f5f5f5;\n' + 
  ' border-radius:12px;\n' + 
  ' text-align:center\n' + 
  ' }\n' + 
  '\n' + 
  ' .cta-wrapper{\n' + 
  ' display:flex;\n' + 
  ' flex-wrap:wrap;\n' + 
  ' justify-content:center;\n' + 
  ' gap:.8rem\n' + 
  ' }\n' + 
  '\n' + 
  ' .cta-button{\n' + 
  ' display:inline-block;\n' + 
  ' background:#febd15;\n' + 
  ' color:#303030;\n' + 
  ' padding:1.1rem 1.8rem;\n' + 
  ' border-radius:8px;\n' + 
  ' text-decoration:none;\n' + 
  ' font-weight:bold;\n' + 
  ' min-width:150px;\n' + 
  ' text-align:center;\n' + 
  ' white-space:nowrap;\n' + 
  ' transition:.2s\n' + 
  ' }\n' + 
  '\n' + 
  ' .cta-button:hover{\n' + 
  ' background:#dba810\n' + 
  ' }\n' + 
  '\n' + 
  ' .cta-button:visited{\n' + 
  ' color:#303030}\n' + 
  '\n' + 
  ' @media(max-width:425px){\n' + 
  ' .cta-button{\n' + 
  ' padding:.9rem 1.2rem;\n' + 
  ' min-width:120px}\n' + 
  ' }\n' + 
  '\n' + 
  ' .toc-container{\n' + 
  ' background:#f4f4f4;\n' + 
  ' padding:20px;\n' + 
  ' border:1px solid #ddd;\n' + 
  ' border-radius:8px;\n' + 
  ' margin:20px auto;\n' + 
  ' max-width:100%\n' + 
  ' }\n' + 
  '\n' + 
  ' .toc{list-style:none;\n' + 
  ' padding:0;\n' + 
  ' margin:0\n' + 
  ' }\n' + '\n' +
  ' .blog-navigation {\n' + 
  ' display: flex;\n' + 
  ' justify-content: space-between;\n' + 
  ' align-items: center;\n' + 
  ' margin-top: 40px;\n' + 
  ' padding-top: 20px;\n' + 
  ' border-top: 1px solid var(--border-color, #ddd);\n' + 
  ' }\n' + 
  '\n' + 
  ' .nav-btn {\n' + 
  ' display: inline-block;\n' + 
  ' background: var(--btn-bg, #febd15);\n' + 
  ' color: var(--btn-color, #303030);\n' + 
  ' padding: 10px 20px;\n' + 
  ' border-radius: 8px;\n' + 
  ' text-decoration: none;\n' + 
  ' font-weight: bold;\n' + 
  ' transition: all 0.3s ease;\n' + 
  ' }\n' + 
  '\n' + 
  ' .nav-btn:hover {\n' + 
  ' background: var(--btn-hover-bg, #dba810);\n' + 
  ' color: var(--btn-hover-color, #303030);\n' + 
  ' }\n' + 
  '\n' + 
  ' .next-btn {\n' + 
  ' margin-left: auto;\n' + 
  ' } \n' +
  '\n' + 
  ' details {\n' + 
  ' cursor: pointer;\n' + 
' } \n' + 
  ' </style>\n'; 

  html += '\n' + 
  '<script>\n' + 
  ' document.addEventListener("DOMContentLoaded",()=>{\n' + 
  '   document.querySelectorAll(".toc a").forEach(a=>{\n' + 
  '     a.addEventListener("click",e=>{\n' + 
  '       e.preventDefault();\n' + 
  '       const id=a.getAttribute("href").substring(1);\n' + 
  '       const el=document.getElementById(id);\n' + 
  '       const off=(el?el.offsetTop:0)-130;\n' + 
  '       window.scrollTo({top:off,behavior:"smooth"});\n' + 
  '     });\n' + 
  '   });\n' + 
  ' });\n' +
  '<\/script>';

  document.getElementById("blogResult").textContent = html;
}

/* ---------- Kopieer + Wis ---------- */
function copyBlog() {
  const btn = document.querySelector("#tab-blog .btn-copy");
  const text = document.getElementById("blogResult").textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = "Copied";
    btn.style.background = "#609942";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Kopieer";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

function clearBlogFields() {
  [
    "h1Title",
    "intro",
    "summaryTitle",
    "summaryText",
    "summaryListTitle",
    "summaryList",
    "ctaText",
    "ctaLink",
    "prevBlogLink",
    "nextBlogLink",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document
    .querySelectorAll("#sections-container .section-block")
    .forEach((b) => b.remove());
  document
    .querySelectorAll("#faq-container .faq-block")
    .forEach((b) => b.remove());
  sectionCount = 0;
  faqCount = 0;
  document.getElementById("blogResult").textContent = "";
}

/* ---------- Helper ---------- */
function formatParagraphs(text) {
  return text
    .split(/\n+/)
    .filter(Boolean)
    .map((p) => `<p>${p.trim()}</p>\n`)
    .join("");
}
