// PRODUCT TEKST
function normalizeList(input){
  if(!input) return [];
  const lines = input.split(/\n+/).map(s=>s.trim()).filter(Boolean);
  // Als er geen enters zijn, gebruik komma's
  if(lines.length<=1){
    return input.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean);
  }
  return lines.map(l=>l.replace(/\s{2,}/g,' '));
}
function keyValueToBullet(input){
  if(!input) return [];
  const lines = input.split(/\n+/).map(s=>s.trim()).filter(Boolean);
  const bullets = [];
  lines.forEach(line=>{
    const m = line.match(/^([^:]+)\s*[:\-]?\s*(.+)$/);
    if(m){ bullets.push(m[1].trim()+': '+m[2].trim()); }
    else{
      // fallback: split op komma's in dezelfde regel
      const parts=line.split(',').map(s=>s.trim()).filter(Boolean);
      bullets.push(...parts);
    }
  });
  if(bullets.length===0){
    return input.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean);
  }
  return bullets;
}
function generateProductText(){
  const intro = document.getElementById('prod-intro').value.trim();
  const bk = document.getElementById('prod-bk').value.trim();
  const tech = document.getElementById('prod-tech').value.trim();
  const std = document.getElementById('prod-std').value.trim();
  let html='';
  if(intro) html += '<p>'+intro+'</p>\n<br>\n';
  html += '<h2>Bijzondere kenmerken</h2>\n';
  const bkItems = normalizeList(bk);
  if(bkItems.length){ html += '<ul>\n'+bkItems.map(i=>'  <li>'+i+'</li>').join('\n')+'\n</ul>\n'; }
  html += '<br>\n';
  html += '<h2>Technische gegevens</h2>\n';
  const techItems = keyValueToBullet(tech);
  if(techItems.length){ html += '<ul>\n'+techItems.map(i=>'  <li>'+i+'</li>').join('\n')+'\n</ul>\n'; }
  html += '<br>\n';
  html += '<h2>Standaard meegeleverd</h2>\n';
  const stdItems = normalizeList(std);
  if(stdItems.length){ html += '<ul>\n'+stdItems.map(i=>'  <li>'+i+'</li>').join('\n')+'\n</ul>\n'; }
  document.getElementById('productResult').textContent = html;
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('.generate-product-text')?.addEventListener('click', generateProductText);
  ['prod-intro','prod-bk','prod-tech','prod-std'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.addEventListener('input', generateProductText);
  });
});
function copyProductText(){ navigator.clipboard.writeText(document.getElementById('productResult').textContent); alert('✅ Producttekst gekopieerd!'); }
function clearProductFields(){ ['prod-intro','prod-bk','prod-tech','prod-std'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';}); document.getElementById('productResult').textContent=''; }
