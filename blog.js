// BLOG GENERATOR
let sectionCount=0, faqCount=0;
function addSection(){
  sectionCount++;
  const container = document.getElementById('sections-container');
  const div = document.createElement('div');
  div.className='section-block';
  div.innerHTML = ''
  + '<button type="button" class="btn-remove" title="Verwijderen">×</button>'
  + '<h4>Sectie '+sectionCount+'</h4>'
  + '<label>Subkop (H2):</label>'
  + '<input type="text" class="sectie-titel" placeholder="Bijv. Hoe gebruik je deze machine?">'
  + '<label>Paragraaftekst:</label>'
  + '<textarea class="sectie-tekst" rows="3" placeholder="Voeg hier je tekst toe..."></textarea>'
  + '<label>Opsomming (komma-gescheiden):</label>'
  + '<input type="text" class="sectie-lijst" placeholder="Bijv. Punt 1, Punt 2, Punt 3">'
  + '<label>Producten toevoegen?</label>'
  + '<select class="sectie-producten-keuze"><option value="nee">Nee</option><option value="ja">Ja</option></select>'
  + '<div class="sectie-producten" style="display:none;">'
  + '  <label>Productcodes (rij 1, komma-gescheiden)</label>'
  + '  <input type="text" class="sectie-productcodes" placeholder="Bijv. DDF485Z, DHP482Z, DTD152Z">'
  + '  <button type="button" class="btn-add-row">+ Productrij toevoegen</button>'
  + '</div><hr>';
  const btn = container.querySelector('button[onclick="addSection()"]');
  container.insertBefore(div, btn);
  // toggle producten
  div.querySelector('.sectie-producten-keuze').addEventListener('change', e=>{
    div.querySelector('.sectie-producten').style.display = e.target.value==='ja'?'block':'none';
  });
  // add product row
  div.querySelector('.btn-add-row').addEventListener('click', ()=>{
    const box = div.querySelector('.sectie-producten');
    const idx = box.querySelectorAll('.sectie-productcodes').length + 1;
    const row = document.createElement('div');
    row.className='product-row';
    row.innerHTML = '<label>Productcodes (rij '+idx+', komma-gescheiden)</label>'
      + '<input type="text" class="sectie-productcodes" placeholder="Bijv. DDF484Z, DHS710Z, DTD153Z">'
      + '<button type="button" class="btn-remove-row" title="Verwijderen">×</button>';
    box.insertBefore(row, div.querySelector('.btn-add-row'));
    row.querySelector('.btn-remove-row').addEventListener('click', ()=>row.remove());
  });
  // remove block
  div.querySelector('.btn-remove').addEventListener('click', ()=>{ div.remove(); renumberSections(); });
  renumberSections();
}
function renumberSections(){
  document.querySelectorAll('#sections-container .section-block').forEach((b,i)=>{
    b.querySelector('h4').textContent = 'Sectie ' + (i+1);
  });
  sectionCount = document.querySelectorAll('#sections-container .section-block').length;
}
function addFAQ(){
  faqCount++;
  const c = document.getElementById('faq-container');
  const div = document.createElement('div');
  div.className='faq-block';
  div.innerHTML = ''
  + '<button type="button" class="btn-remove" title="Verwijderen">×</button>'
  + '<h4>Vraag '+faqCount+'</h4>'
  + '<label>Vraag:</label><input type="text" class="faq-vraag" placeholder="Bijv. Hoe werkt dit product?">'
  + '<label>Antwoord:</label><textarea class="faq-antwoord" rows="2" placeholder="Voeg hier het antwoord toe..."></textarea><hr>';
  const btn = c.querySelector('button[onclick="addFAQ()"]');
  c.insertBefore(div, btn);
  div.querySelector('.btn-remove').addEventListener('click', ()=>{ div.remove(); renumberFAQs(); });
  renumberFAQs();
}
function renumberFAQs(){
  document.querySelectorAll('#faq-container .faq-block').forEach((b,i)=>{
    b.querySelector('h4').textContent = 'Vraag ' + (i+1);
  });
  faqCount = document.querySelectorAll('#faq-container .faq-block').length;
}
function generateBlog(){
  const intro = document.getElementById('intro').value.trim();
  const ctaText = document.getElementById('ctaText').value.trim();
  const ctaLink = document.getElementById('ctaLink').value.trim();
  const blocks = document.querySelectorAll('#sections-container .section-block');
  const titles = document.querySelectorAll('.sectie-titel');
  let tocItems=[];
  titles.forEach((t,i)=>{
    const titel = t.value.trim() || 'Sectie '+(i+1);
    tocItems.push({id:'sectie'+(i+1),label:titel});
  });
  let html='';
  html += `<p>${intro}</p>\n`;
  html += `<div class="toc-container">\n  <h2>Inhoudsopgave</h2>\n  <ul class="toc">\n`;
  tocItems.forEach(t=>html += `    <li><a class="tm-link" href="#${t.id}">${t.label}</a></li>\n`);
  html += `    <li><a class="tm-link" href="#Assortiment">Ons assortiment</a></li>\n    <li><a class="tm-link" href="#FAQ">Veelgestelde vragen</a></li>\n  </ul>\n</div>\n`;
  blocks.forEach((block,i)=>{
    const titel = (block.querySelector('.sectie-titel').value || `Sectie ${i+1}`);
    const par = block.querySelector('.sectie-tekst').value.trim();
    const lijst = block.querySelector('.sectie-lijst').value.trim();
    const wilProd = block.querySelector('.sectie-producten-keuze').value==='ja';
    const productInputs = block.querySelectorAll('.sectie-productcodes');
    let productRows=[];
    productInputs.forEach(inp=>{
      const codes = inp.value.split(',').map(c=>c.trim()).filter(Boolean);
      if(codes.length){ productRows.push(codes); }
    });
    html += `<section id="sectie${i+1}">\n  <h2>${titel}</h2>\n`;
    if(par) html += `  <p>${par}</p>\n`;
    if(lijst){
      const items = lijst.split(',').map(s=>s.trim()).filter(Boolean);
      if(items.length){ html += '  <ul>\n' + items.map(x=>'    <li>'+x+'</li>').join('\n') + '\n  </ul>\n'; }
    }
    if(wilProd && productRows.length){
      productRows.forEach(row=>{
        html += '  <blok-horizontaal breedte:100>\n';
        row.forEach(code=>{
          html += '    <blok-horizontaal breedte:30>\n      <product>\n        <productcode>'+code+'</productcode><includeprice>true</includeprice>\n      </product>\n    </blok-horizontaal>\n';
        });
        html += '  </blok-horizontaal>\n';
      });
    }
    html += '</section>\n';
  });
  html += `<section id="Assortiment">\n  <h2>Ons assortiment</h2>\n  <div class="cta-box">\n    <p>Bekijk ons gehele assortiment aan </p>\n    <div class="cta-wrapper">\n      <a href="${ctaLink}" class="cta-button">${ctaText}</a>\n    </div>\n  </div>\n</section>\n`;
  const fq = document.querySelectorAll('#faq-container .faq-vraag');
  const fa = document.querySelectorAll('#faq-container .faq-antwoord');
  html += `<section id="FAQ">\n  <h2>Veelgestelde vragen</h2>\n`;
  fq.forEach((q,i)=>{
    const vraag=q.value.trim(); const antw=(fa[i]?.value.trim()||'');
    if(vraag && antw){ html += `  <details>\n    <summary>${vraag}</summary>\n    <p>${antw}</p>\n  </details>\n`; }
  });
  html += `</section>\n`;
  // style+script minimal (anchors smooth scroll)
  html += '<style> .cta-box{margin:2em 0;padding:1.5em;background:#f5f5f5;border-radius:12px;text-align:center} .cta-wrapper{display:flex;flex-wrap:wrap;justify-content:center;gap:.8rem} .cta-button{display:inline-block;background:#febd15;color:#303030;padding:1.1rem 1.8rem;border-radius:8px;text-decoration:none;font-weight:bold;min-width:150px;text-align:center;white-space:nowrap;transition:.2s} .cta-button:hover{background:#dba810} .toc-container{background:#f4f4f4;padding:20px;border:1px solid #ddd;border-radius:8px;margin:20px auto;max-width:100%} .toc{list-style:none;padding:0;margin:0} </style>\n';
  html += '<script>document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".toc a").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const id=a.getAttribute("href").substring(1);const el=document.getElementById(id);const off=(el?el.offsetTop:0)-130;window.scrollTo({top:off,behavior:"smooth"});});});});<\/script>';
  document.getElementById('blogResult').textContent = html;
}
function copyBlog(){navigator.clipboard.writeText(document.getElementById('blogResult').textContent); alert('✅ HTML gekopieerd!');}
function clearBlogFields(){
  ['intro','ctaText','ctaLink'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  document.querySelectorAll('#sections-container .section-block').forEach(b=>b.remove());
  document.querySelectorAll('#faq-container .faq-block').forEach(b=>b.remove());
  sectionCount=0; faqCount=0;
  document.getElementById('blogResult').textContent='';
}
