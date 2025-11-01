// POPULAIRE MERKEN
let merkCount=0;
function addMerk(name='', link=''){
  merkCount++;
  const container=document.getElementById('merken-container');
  const div=document.createElement('div');
  div.className='merk-block';
  div.innerHTML = `
    <button class="btn-remove" title="Verwijderen">×</button>
    <h4>Merk ${merkCount}</h4>
    <label>Merknaam</label>
    <input type="text" class="merk-naam" placeholder="Bijv. Makita" value="${name}">
    <label>Link (relatief of volledig)</label>
    <input type="text" class="merk-link" placeholder="/makita/afkortzaag.html" value="${link}">
  `;
  container.appendChild(div);
  div.querySelector('.btn-remove').addEventListener('click',()=>{ div.remove(); renumberMerken(); generateMerkenHTML(); });
  div.addEventListener('input', e=>{
    if(e.target.classList.contains('merk-naam') || e.target.classList.contains('merk-link')) generateMerkenHTML();
  });
  generateMerkenHTML();
}
function renumberMerken(){
  document.querySelectorAll('#merken-container .merk-block').forEach((b,i)=> b.querySelector('h4').textContent='Merk '+(i+1));
  merkCount=document.querySelectorAll('#merken-container .merk-block').length;
}
function generateMerkenHTML(){
  const names=[...document.querySelectorAll('.merk-naam')];
  const links=[...document.querySelectorAll('.merk-link')];
  const arr=[];
  for(let i=0;i<names.length;i++){
    const merk=names[i].value.trim(); const link=links[i].value.trim();
    if(merk && link){ arr.push(`<a class="tm-link" href="${link}">${merk}</a>`); }
  }
  const output=arr.length? `<p>Populaire merken: ${arr.join(' | ')}</p>` : '';
  document.getElementById('merkenResult').textContent = output;
}
function copyMerken(){
  const text=document.getElementById('merkenResult').textContent.trim();
  if(!text) return alert('Er is geen HTML om te kopiëren.');
  navigator.clipboard.writeText(text).then(()=>alert('✅ HTML gekopieerd!'));
}
function clearMerkenFields(){
  document.getElementById('merken-container').innerHTML='';
  document.getElementById('merkenResult').textContent='';
  merkCount=0;
}
function addDefaultMerken(){
  const value=document.getElementById('defaultMerkenSelect').value;
  if(!value) return alert('Kies eerst een categorie.');
  const defaults=[
    { merk:'Metabo', link:`/metabo/${value}.html`},
    { merk:'DeWALT', link:`/dewalt/${value}.html`},
    { merk:'Makita', link:`/makita/${value}.html`},
    { merk:'Bosch', link:`/bosch/${value}.html`},
    { merk:'Hikoki', link:`/hikoki/${value}.html`},
    { merk:'Festool', link:`/festool/${value}.html`},
  ];
  defaults.forEach(m=>addMerk(m.merk, m.link));
}
