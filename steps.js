// STAPPENPLAN
let hasWaarom = false, hasBenodigd = false, hasMaterialen = false;
let stepCount = 0, faqStepsCount = 0;

function addWaarom() {
  if (hasWaarom) return alert('Sectie "Waarom?" is al toegevoegd.');
  hasWaarom = true;
  const wrap = document.getElementById('opt-sections');
  const div = document.createElement('div');
  div.className = 'opt-block'; div.dataset.kind = 'waarom';
  div.innerHTML = '<button class="btn-remove">×</button><h4>Waarom?</h4>'
    + '<label>H2-tekst</label><input class="opt-waarom-h2" placeholder="Waarom zelf ...?">'
    + '<label>Paragraaf</label><textarea class="opt-waarom-p" rows="2" placeholder="Korte uitleg..."></textarea>';
  wrap.appendChild(div);
  div.querySelector('.btn-remove').addEventListener('click', () => { div.remove(); hasWaarom = false; });
}
function addBenodigd() {
  if (hasBenodigd) return alert('Sectie "Benodigd gereedschap" is al toegevoegd.');
  hasBenodigd = true;
  const wrap = document.getElementById('opt-sections');
  const div = document.createElement('div');
  div.className = 'opt-block'; div.dataset.kind = 'benodigd';
  div.innerHTML = '<button class="btn-remove">×</button><h4>Benodigd gereedschap</h4>'
    + '<label>H2-tekst</label><input class="opt-ben-h2" placeholder="Benodigd gereedschap">'
    + '<label>Paragraaf</label><textarea class="opt-ben-p" rows="2" placeholder="Waarom dit gereedschap..."></textarea>'
    + '<label>Opsomming (komma-gescheiden)</label><input class="opt-ben-list" placeholder="Boormachine, Waterpas, Tegelzaag">'
    + '<div class="product-rows"><div class="product-row"><label>Productcodes (rij 1, komma-gescheiden)</label><input class="opt-ben-codes" placeholder="DDF485Z, DHP482Z, DTD152Z"></div></div>'
    + '<button type="button" class="btn-add-row">+ Productrij toevoegen</button>';
  wrap.appendChild(div);
  div.querySelector('.btn-remove').addEventListener('click', () => { div.remove(); hasBenodigd = false; });
  div.querySelector('.btn-add-row').addEventListener('click', () => {
    const rows = div.querySelector('.product-rows');
    const count = rows.querySelectorAll('.product-row').length + 1;
    const row = document.createElement('div'); row.className = 'product-row';
    row.innerHTML = '<label>Productcodes (rij ' + count + ', komma-gescheiden)</label><input class="opt-ben-codes" placeholder="Bijv. DDF484Z, DHS710Z, DTD153Z"><button type="button" class="btn-remove-row" title="Verwijderen">×</button>';
    rows.appendChild(row); row.querySelector('.btn-remove-row').addEventListener('click', () => row.remove());
  });
}
function addMaterialen() {
  if (hasMaterialen) return alert('Sectie "Materialen" is al toegevoegd.');
  hasMaterialen = true;
  const wrap = document.getElementById('opt-sections');
  const div = document.createElement('div');
  div.className = 'opt-block'; div.dataset.kind = 'materialen';
  div.innerHTML = '<button class="btn-remove">×</button><h4>Materialen</h4>'
    + '<label>H2-tekst</label><input class="opt-mat-h2" placeholder="Materialen">'
    + '<label>Paragraaf</label><textarea class="opt-mat-p" rows="2" placeholder="Welke materialen..."></textarea>'
    + '<label>Opsomming (komma-gescheiden)</label><input class="opt-mat-list" placeholder="Tegellijm, Voegmiddel, Randprofielen">'
    + '<div class="product-rows"><div class="product-row"><label>Productcodes (rij 1, komma-gescheiden)</label><input class="opt-mat-codes" placeholder="Bijv. DDF485Z, DHP482Z, DTD152Z"></div></div>'
    + '<button type="button" class="btn-add-row">+ Productrij toevoegen</button>';
  wrap.appendChild(div);
  div.querySelector('.btn-remove').addEventListener('click', () => { div.remove(); hasMaterialen = false; });
  div.querySelector('.btn-add-row').addEventListener('click', () => {
    const rows = div.querySelector('.product-rows');
    const count = rows.querySelectorAll('.product-row').length + 1;
    const row = document.createElement('div'); row.className = 'product-row';
    row.innerHTML = '<label>Productcodes (rij ' + count + ', komma-gescheiden)</label><input class="opt-mat-codes" placeholder="Bijv. DDF484Z, DHS710Z, DTD153Z"><button type="button" class="btn-remove-row" title="Verwijderen">×</button>';
    rows.appendChild(row); row.querySelector('.btn-remove-row').addEventListener('click', () => row.remove());
  });
}
function addStep() {
  stepCount++;
  const c = document.getElementById('steps-container');
  const block = document.createElement('div'); block.className = 'stap-block';
  block.innerHTML = '<button type="button" class="btn-remove" title="Verwijderen">×</button><h4>Stap ' + stepCount + '</h4>'
    + '<label>Titel</label><input type="text" class="stap-titel" placeholder="Stap ' + stepCount + '">'
    + '<label>Tekst</label><textarea class="stap-tekst" rows="3" placeholder="Beschrijf hier wat je doet in deze stap..."></textarea>'
    + '<label>Opsomming (komma-gescheiden)</label><input type="text" class="stap-lijst" placeholder="Bijv. Meet af, Snijd op maat, Plaats tegel">'
    + '<label>Afbeeldinglink</label><input type="text" class="stap-image" placeholder="https://www.toolmax.nl/files/stap-' + stepCount + '.jpg">';
  const btn = c.querySelector('button[onclick="addStep()"]');
  c.insertBefore(block, btn);
  block.querySelector('.btn-remove').addEventListener('click', () => { block.remove(); renumberSteps(); });
  renumberSteps();
}
function renumberSteps() {
  const steps = document.querySelectorAll('#steps-container .stap-block');
  steps.forEach((b, i) => {
    const num = i + 1; b.querySelector('h4').textContent = 'Stap ' + num;
    const imgInput = b.querySelector('.stap-image'); if (imgInput && !imgInput.value) { imgInput.placeholder = 'https://www.toolmax.nl/files/stap-' + num + '.jpg'; }
  });
  stepCount = steps.length;
}
function addFAQStep() {
  faqStepsCount++;
  const c = document.getElementById('faq-steps-container');
  const div = document.createElement('div'); div.className = 'faq-block';
  div.innerHTML = '<button type="button" class="btn-remove">×</button><h4>Vraag ' + faqStepsCount + '</h4>'
    + '<label>Vraag:</label><input type="text" class="faq-vraag-steps" placeholder="Bijv. Hoe lang moet de tegellijm drogen?">'
    + '<label>Antwoord:</label><textarea class="faq-antwoord-steps" rows="2" placeholder="Gemiddeld 24 uur."></textarea>';
  const btn = c.querySelector('button[onclick="addFAQStep()"]');
  c.insertBefore(div, btn);
  div.querySelector('.btn-remove').addEventListener('click', () => { div.remove(); renumberFAQSteps(); });
  renumberFAQSteps();
}
function renumberFAQSteps() {
  document.querySelectorAll('#faq-steps-container .faq-block').forEach((b, i) => {
    b.querySelector('h4').textContent = 'Vraag ' + (i + 1);
  });
  faqStepsCount = document.querySelectorAll('#faq-steps-container .faq-block').length;
}
function generateStepsBlog() {
  const intro = document.getElementById('intro-steps').value.trim();
  const ctaText = document.getElementById('ctaText-steps').value.trim();
  const ctaLink = document.getElementById('ctaLink-steps').value.trim();
  let toc = [];
  const why = document.querySelector('#opt-sections .opt-block[data-kind="waarom"]');
  const ben = document.querySelector('#opt-sections .opt-block[data-kind="benodigd"]');
  const mat = document.querySelector('#opt-sections .opt-block[data-kind="materialen"]');
  if (why) toc.push({ id: 'Waarom', label: (why.querySelector('.opt-waarom-h2').value.trim() || 'Waarom?') });
  if (ben) toc.push({ id: 'Benodigd gereedschap', label: (ben.querySelector('.opt-ben-h2').value.trim() || 'Benodigd gereedschap') });
  if (mat) toc.push({ id: 'Materialen', label: (mat.querySelector('.opt-mat-h2').value.trim() || 'Materialen') });
  const steps = document.querySelectorAll('#steps-container .stap-block');
  steps.forEach((s, i) => {
    const title = s.querySelector('.stap-titel').value.trim();
    toc.push({ id: 'stap' + (i + 1), label: title || ('Stap ' + (i + 1)) });
  });
  toc.push({ id: 'Assortiment', label: 'Ons assortiment' });
  toc.push({ id: 'FAQ', label: 'Veelgestelde vragen' });
  let html = '<p>' + intro + '</p>\n<div class="toc-container">\n<h2>Inhoudsopgave</h2>\n<ul class="toc">\n';
  toc.forEach(t => html += '<li><a class="tm-link" href="#' + t.id + '">' + t.label + '</a></li>\n');
  html += '</ul>\n</div>\n';
  // Waarom
  if (why) {
    const h2 = (why.querySelector('.opt-waarom-h2').value.trim() || 'Waarom?');
    const p = (why.querySelector('.opt-waarom-p').value.trim() || 'TEKST');
    html += '<section id="Waarom">\n<h2>' + h2 + '</h2>\n<p>' + p + '</p>\n</section>\n<hr class="divider"/>\n';
  }
  // Benodigd
  if (ben) {
    const h2 = (ben.querySelector('.opt-ben-h2').value.trim() || 'Benodigd gereedschap');
    const p = (ben.querySelector('.opt-ben-p').value.trim() || '');
    const listRaw = ben.querySelector('.opt-ben-list').value.trim();
    html += '<section id="Benodigd gereedschap">\n<h2>' + h2 + '</h2>\n<p>' + p + '</p>\n';
    if (listRaw) {
      const items = listRaw.split(',').map(x => x.trim()).filter(Boolean);
      html += '<ul>\n' + items.map(i => '<li>' + i + '</li>').join('\n') + '\n</ul>\n';
    }
    const codeRows = ben.querySelectorAll('.opt-ben-codes');
    codeRows.forEach(row => {
      const rowVal = row.value.trim(); if (!rowVal) return;
      const codes = rowVal.split(',').map(x => x.trim()).filter(Boolean);
      if (codes.length) {
        html += '  <blok-horizontaal breedte:100>\n';
        codes.forEach(c => {
          html += '    <blok-horizontaal breedte:30>\n<product>\n<productcode>' + c + '</productcode><includeprice>true</includeprice>\n</product>\n</blok-horizontaal>\n';
        });
        html += '  </blok-horizontaal>\n';
      }
    });
    html += '</section>\n<hr class="divider"/>\n';
  }
  // Materialen
  if (mat) {
    const h2 = (mat.querySelector('.opt-mat-h2').value.trim() || 'Materialen');
    const p = (mat.querySelector('.opt-mat-p').value.trim() || '');
    const listRaw = mat.querySelector('.opt-mat-list').value.trim();
    html += '<section id="Materialen">\n<h2>' + h2 + '</h2>\n<p>' + p + '</p>\n';
    if (listRaw) {
      const items = listRaw.split(',').map(x => x.trim()).filter(Boolean);
      html += '<ul>\n' + items.map(i => '<li>' + i + '</li>').join('\n') + '\n</ul>\n';
    }
    const codeRows = mat.querySelectorAll('.opt-mat-codes');
    codeRows.forEach(row => {
      const rowVal = row.value.trim(); if (!rowVal) return;
      const codes = rowVal.split(',').map(x => x.trim()).filter(Boolean);
      if (codes.length) {
        html += '  <blok-horizontaal breedte:100>\n';
        codes.forEach(c => {
          html += '    <blok-horizontaal breedte:30>\n<product>\n<productcode>' + c + '</productcode><includeprice>true</includeprice>\n</product>\n</blok-horizontaal>\n';
        });
        html += '  </blok-horizontaal>\n';
      }
    });
    html += '</section>\n<hr class="divider"/>\n';
  }
  // Stappen
  steps.forEach((s, i) => {
    const idx = i + 1;
    const titel = (s.querySelector('.stap-titel').value.trim() || ('Stap ' + idx));
    const tekst = (s.querySelector('.stap-tekst').value.trim() || 'TEKST');
    const lijst = (s.querySelector('.stap-lijst').value.trim() || '');
    const img = (s.querySelector('.stap-image').value.trim() || ('https://www.toolmax.nl/files/stap-' + idx + '.jpg'));
    const imgLeft = (idx % 2 === 0);
    html += '<section id="stap' + idx + '">\n<div class="container">\n';
    if (!imgLeft) {
      html += '<div class="text">\n' + (idx === 1 ? '<h2>Stappenplan</h2><br>\n' : '') + '<h3>' + titel + '</h3>\n<p>' + tekst + '</p>\n';
      if (lijst) {
        const items = lijst.split(',').map(x => x.trim()).filter(Boolean);
        html += '<ul>\n' + items.map(i => '<li>' + i + '</li>').join('\n') + '\n</ul>\n';
      }
      html += '</div>\n<div class="image banner right"><img alt="' + titel + '" src="' + img + '"/></div>\n';
    } else {
      html += '<div class="image banner left"><img alt="' + titel + '" src="' + img + '"/></div>\n<div class="text">\n<h3>' + titel + '</h3>\n<p>' + tekst + '</p>\n';
      if (lijst) {
        const items = lijst.split(',').map(x => x.trim()).filter(Boolean);
        html += '<ul>\n' + items.map(i => '<li>' + i + '</li>').join('\n') + '\n</ul>\n';
      }
      html += '</div>\n';
    }
    html += '</div>\n</section>\n<hr class="divider"/>\n';
  });
  // CTA + FAQ
  html += '<section id="Assortiment">\n<h2>Ons assortiment</h2>\n<div class="cta-box">\n<p>Bekijk ons gehele assortiment aan </p>\n<div class="cta-wrapper">\n<a href="' + ctaLink + '" class="cta-button">' + ctaText + '</a>\n</div></div></section>\n';
  html += '<section id="FAQ">\n<h2>Veelgestelde vragen</h2>\n';
  const fq = document.querySelectorAll('#faq-steps-container .faq-vraag-steps');
  const fa = document.querySelectorAll('#faq-steps-container .faq-antwoord-steps');
  fq.forEach((q, i) => { const vraag = q.value.trim(), antw = (fa[i]?.value.trim() || ''); if (vraag && antw) html += '<details>\n<summary>' + vraag + '</summary>\n<p>' + antw + '</p>\n</details>\n'; });
  html += '</section>\n';
  html += '<style>\n' +
'  .container{\n' +
'   display:flex;\n' +
'   flex-wrap:wrap;\n'+
'   align-items:center\n' +
'   }\n' +
'\n' +
'   .image.banner.right{\n' +
'   flex:1 1 50%;\n' +
'   display:flex;\n' +
'   justify-content:flex-end\n' +
'   }\n' +
'\n' +
'   .image.banner.left{\n' +
'   flex:1 1 50%;\n' +
'   display:flex;\n' +
'   justify-content:flex-start\n' +
'   }\n' +
'\n' +
'   .image.banner img{\n' +
'   max-width:100%;\n' +
'   height:auto\n' +
'   }\n' +
'\n' +
'   .text{\n' +
'   flex:1 1 50%;\n' +
'   padding:20px 0 0 0\n' +
'   }\n' +
'\n' +
'   @media screen and (max-width:768px){\n' +
'   .image.banner,\n' +
'   .text{\n' +
'   flex:1 1 100%\n' +
'     }\n' +
'   }\n' +
'\n' +
'   .divider{\n' +
'   border:none;\n' +
'   height:2px;\n' +
'   background:#e1e1e1!important;\n' +
'   margin:30px 0\n' +
'   }\n' +
'\n' +
'   .toc-container{\n' +
'   background:#f4f4f4;\n' +
'   padding:20px;\n' +
'   border:1px solid #ddd;\n' +
'   border-radius:8px;\n' +
'   margin:20px auto;\n' +
'   max-width:100%\n' +
'   }\n' +
'\n' +
'   .toc{\n' +
'   list-style:none;\n' +
'   padding:0;\n' +
'   margin:0\n' +
'   }\n' +
'\n' +
'   .cta-box{margin:2em 0;\n' +
'   padding:1.5em;\n' +
'   background:#f5f5f5;\n' +
'   border-radius:12px;\n' +
'   text-align:center}\n' +
'   .cta-wrapper{display:flex;\n' +
'   flex-wrap:wrap;\n' +
'   justify-content:center;\n' +
'   gap:.8rem\n' +
'   }\n' +
'\n' +
'   .cta-button{\n' +
'   display:inline-block;\n' +
'   background:#febd15;\n' +
'   color:#303030;\n' +
'   padding:1.1rem 1.8rem;\n' +
'   border-radius:8px;\n' +
'   text-decoration:none;\n' +
'   font-weight:bold;\n' +
'   min-width:150px;\n' +
'   text-align:center;\n' +
'   white-space:nowrap;\n' +
'   transition:.2s}\n' +
'\n' +
'   .cta-button:hover{\n' +
'   background:#dba810}\n' +
'\n' +
'   .cta-button:visited{\n' +
'   color:#303030}\n' +
'\n' +
'   @media(max-width:425px){\n' +
'   .cta-button{\n' +
'   padding:.9rem 1.2rem;\n' +
'   min-width:120px}\n' +
'   }\n' +
'</style>\n';

  html += '\n' +'<script>\n' +
'   document.addEventListener("DOMContentLoaded",()=>{\n' +
'   document.querySelectorAll(".toc a").forEach(a=>{\n' +
'   a.addEventListener("click",e=>{\n' +
'   e.preventDefault();\n' +
'   const id=a.getAttribute("href").substring(1);\n' +
'   const el=document.getElementById(id);\n' +
'   const off=(el?el.offsetTop:0)-130;\n' +
'   window.scrollTo({top:off,behavior:"smooth"});\n' +
'      });\n' +
'    });\n' +
'  });\n' +
'<\/script>';
  document.getElementById('stepsResult').textContent = html;
}
function copySteps() { navigator.clipboard.writeText(document.getElementById('stepsResult').textContent); alert('HTML gekopieerd!'); }
function clearStepsFields() {
  ['intro-steps', 'ctaText-steps', 'ctaLink-steps'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.querySelectorAll('#opt-sections .opt-block').forEach(b => b.remove());
  document.querySelectorAll('#steps-container .stap-block').forEach(b => b.remove());
  document.querySelectorAll('#faq-steps-container .faq-block').forEach(b => b.remove());
  hasWaarom = false; hasBenodigd = false; hasMaterialen = false; stepCount = 0; faqStepsCount = 0;
  document.getElementById('stepsResult').textContent = '';
}
