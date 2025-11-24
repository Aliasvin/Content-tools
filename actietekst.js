let actieSectionCount = 0;

// -------------------------------------------------------------
// SECTIE TOEVOEGEN
// -------------------------------------------------------------
function addActieSection() {
  actieSectionCount++;

  const container = document.getElementById("actie-sections");

  const div = document.createElement("div");
  div.className = "actie-section";
  div.dataset.id = actieSectionCount;

  div.innerHTML = `
    <div class="section-block">
      <label>Sectie titel</label>
      <input type="text" class="actie-sec-title" placeholder="Titel...">

      <label>Soort content</label>
      <select class="actie-sec-type">
        <option value="paragraph">Paragraaf</option>
        <option value="list">Opsomming</option>
      </select>

      <label>Content</label>
      <textarea rows="4" class="actie-sec-text" placeholder="Tekst of lijst (1 item per regel)..."></textarea>

      <button class="btn-remove" type="button" onclick="removeActieSection(${actieSectionCount})">x</button>
    </div>
  `;

  container.appendChild(div);
}

// -------------------------------------------------------------
// SECTIE VERWIJDEREN
// -------------------------------------------------------------
function removeActieSection(id) {
  const section = document.querySelector(`.actie-section[data-id="${id}"]`);
  if (section) section.remove();
}

// -------------------------------------------------------------
// GENERATE – ALLE 3 OUTPUTS
// -------------------------------------------------------------
function generateActieCMS() {
  const title = document.getElementById("actie-title").value.trim();
  const paragraph = document.getElementById("actie-paragraph").value.trim();
  const actieperiode = document.getElementById("actie-periode").value.trim();
  const alt = document.getElementById("actie-alt").value.trim();
  const image = document.getElementById("actie-image").value.trim();
  const actieLink = document.getElementById("actie-link").value.trim();

  let output1 = ""; // categorie output
  let output2 = ""; // actiepagina output
  let output3 = ""; // banner output

  // -------------------------------------------------------------
  // OUTPUT 1 – CATEGORIE TEKST
  // -------------------------------------------------------------

  if (image) {
    output1 += `<div class="banner-image-container"><img class="lazyloaded" alt="${alt}" src="${image}"></div>\n`;
  }

  if (title) output1 += `<h2>${title}</h2>\n`;
  if (paragraph) output1 += `<p>${paragraph}</p>\n`;
  if (actieperiode) output1 += `<p><strong>Actieperiode:${actieperiode}</strong></p>\n`;

  // Secties toevoegen
  document.querySelectorAll(".actie-section").forEach(sec => {
    const secTitle = sec.querySelector(".actie-sec-title").value.trim();
    const secType = sec.querySelector(".actie-sec-type").value;
    const secText = sec.querySelector(".actie-sec-text").value.trim();

    if (secTitle) output1 += `<h3>${secTitle}</h3>\n`;

    if (secText) {
      if (secType === "paragraph") {
        output1 += `<p>${secText}</p>\n`;
      } else {
        const arr = secText.split("\n").map(t => t.trim()).filter(Boolean);
        output1 += `<ul>\n${arr.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>\n`;
      }
    }
  });

  // Extra category CSS
  output1 += `<style>
    .customtext-holder.customtext-holderprod p img {
        width: 130px;
        margin: 0;
        display: none;
    }

    .quick-filter-buttons .productlist-imgholder img {
        float: initial;
        margin: auto;
        width: 130px;
        height: 130px;
        padding: 10px;
    }

    .half-size-category {
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin-right: 10px;
    }

    .banner-category {
        width: 100%;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    .banner-image-container img {
        width: 100%;
        height: auto;
    }
    @media (max-width: 768px) {
        .half-size-category { width: 100%; }
        .grouplist-mainholder { display: block; }
    }

    @media (max-width: 479px) {
        .banner-image-container img {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 5px;
        }
            
        .grouplist-mainholder { display: block; }
    }
  </style>`;

  // -------------------------------------------------------------
  // OUTPUT 2 – ACTIEPAGINA (LM-FOLD + MORE)
  // -------------------------------------------------------------
  output2 += `<div class="container lm-fold" data-lm-fold="" data-lm-height="150" id="lm-bind-yonl37afqy" data-open="0" data-lm-bound="1" style="--lmh: 150px;">\n`;

  if (title) output2 += `<div class="text">\n<h2>${title}</h2>\n`;
  if (paragraph) output2 += `<p>${paragraph}</p>\n`;
  if (actieperiode) output2 += `<p><strong>Actieperiode:${actieperiode}</strong></p>\n</div>\n`;

  if (image) {
    output2 += `<div class="image banner right"><img class="lazyloaded" alt="${alt}" src="${image}"></div>\n`;
  }

  // Secties in .more
  let sectionsHTML = "";

  document.querySelectorAll(".actie-section").forEach(sec => {
    const secTitle = sec.querySelector(".actie-sec-title").value.trim();
    const secType = sec.querySelector(".actie-sec-type").value;
    const secText = sec.querySelector(".actie-sec-text").value.trim();

    if (secTitle) sectionsHTML += `<h3>${secTitle}</h3>\n`;

    if (secText) {
      if (secType === "paragraph") {
        sectionsHTML += `<p>${secText}</p>\n`;
      } else {
        const arr = secText.split("\n").map(t => t.trim()).filter(Boolean);
        sectionsHTML += `<ul>\n${arr.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>\n`;
      }
    }
  });

  if (sectionsHTML.trim() !== "") {
    output2 += `<div class="more">\n<br>\n${sectionsHTML}</div>\n`;
  }

  output2 += `</div>\n`;

  output2 += `<style>
    .container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .text {
      flex: 1 1 50%;
      padding: 0 1rem 0 0;
    }

    .image.banner.right {
      flex: 1 1 50%;
      display: flex;
      justify-content: flex-end;
      margin: 0;
      padding: 0 0 0 1rem;
    }

    .image.banner.right img {
      max-width: 100%;
      height: auto;
      margin: 0;
      padding: 0;
    }

    @media screen and (max-width: 768px) {
      .image.banner.right,
      .text {
        flex: 1 1 100%;
        padding: 0;
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .image.banner.right {
        order: 1;
      }

      .text {
        order: 2;
      }

      .more {
        order: 3;
      }

      .text h2 {
        margin-top: 1rem;
      }
    }
  </style>`;

  // -------------------------------------------------------------
  // OUTPUT 3 – BANNER + CTA
  // -------------------------------------------------------------
  if (image) {
    output3 += `<div class="banner-image-container">
    <a title="${alt}" href="${actieLink}">
        <img src="${image}" alt="${alt}" class="lazyloaded">
    </a>
</div>
<br>
`;
  }

  if (title) output3 += `<h2>${title}</h2>\n`;
  if (paragraph) output3 += `<p>${paragraph}</p>\n`;

  if (actieperiode) {
    output3 += `<p><strong>Actieperiode:</strong> ${actieperiode}</p>\n`;
  }

  output3 += `<br>
<a href="${actieLink}" class="cta-button">Bekijk de actie</a>
<br>
<hr class="divider">
`;

  // -------------------------------------------------------------
  // OUTPUTS IN DE PRE FIELDS
  // -------------------------------------------------------------
  document.getElementById("actie-output-category").textContent = output1;
  document.getElementById("actie-output").textContent = output2;
  document.getElementById("actie-output-banner").textContent = output3;
}

// -------------------------------------------------------------
// COPY FUNCTIES
// -------------------------------------------------------------
function copyActieOutput1() {
  navigator.clipboard.writeText(document.getElementById("actie-output-category").textContent);
}

function copyActieOutput2() {
  navigator.clipboard.writeText(document.getElementById("actie-output").textContent);
}

function copyActieOutput3() {
  navigator.clipboard.writeText(document.getElementById("actie-output-banner").textContent);
}

// -------------------------------------------------------------
// CLEAR FUNCTIE
// -------------------------------------------------------------
function clearActieCMS() {
  document.getElementById("actie-title").value = "";
  document.getElementById("actie-paragraph").value = "";
  document.getElementById("actie-periode").value = "";
  document.getElementById("actie-alt").value = "";
  document.getElementById("actie-image").value = "";
  document.getElementById("actie-link").value = "";
  document.getElementById("actie-sections").innerHTML = "";

  document.getElementById("actie-output-category").textContent = "";
  document.getElementById("actie-output").textContent = "";
  document.getElementById("actie-output-banner").textContent = "";

  actieSectionCount = 0;
}
