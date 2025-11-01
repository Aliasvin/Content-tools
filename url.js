// URL GENERATOR + BULK
function generateURLLive(){
  const input=document.getElementById('inputField');
  let text=(input.value||'').trimStart().toLowerCase();
  let slug=text.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  document.getElementById('result').textContent = slug ? slug + '.html' : '';
  document.getElementById('resultURL').textContent = slug ? 'https://www.toolmax.nl/' + slug + '.html' : '';
  const show = !!slug;
  document.getElementById('copyButton1').style.display = show?'inline-flex':'none';
  document.getElementById('copyButton2').style.display = show?'inline-flex':'none';
}
function copyToClipboardAlle(id){
  const text=document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}
function clearFields3(){
  document.getElementById('inputField').value='';
  document.getElementById('result').textContent='';
  document.getElementById('resultURL').textContent='';
  document.getElementById('copyButton1').style.display='none';
  document.getElementById('copyButton2').style.display='none';
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('inputField')?.addEventListener('input', generateURLLive);
});

// Bulk URL
function generateBulkURLs(){
  const fileInput=document.getElementById('bulkFile');
  const file=fileInput.files[0];
  if(!file){ alert('Upload eerst een Excel-bestand.'); return; }
  const reader=new FileReader();
  reader.onload=function(e){
    const data=new Uint8Array(e.target.result);
    const workbook=XLSX.read(data,{type:'array'});
    const sheet=workbook.Sheets[workbook.SheetNames[0]];
    const rows=XLSX.utils.sheet_to_json(sheet,{header:1});
    if(!rows.length){ alert('Het bestand is leeg.'); return; }
    let html='<table><thead><tr><th>Originele tekst</th><th>Slug</th><th>Volledige URL</th></tr></thead><tbody>';
    rows.forEach((row)=>{
      if(!row[0]) return;
      const input=row[0].toString().trim().toLowerCase();
      const slug=input.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
      const url='https://www.toolmax.nl/'+slug+'.html';
      html += `<tr><td>${row[0]}</td><td>${slug}.html</td><td>${url}</td></tr>`;
    });
    html += '</tbody></table>';
    document.getElementById('bulk-url-table').innerHTML=html;
  };
  reader.readAsArrayBuffer(file);
}
function clearBulkURLs(){
  document.getElementById('bulkFile').value='';
  document.getElementById('bulk-url-table').innerHTML='';
}
function exportBulkURLs(){
  const table=document.querySelector('#bulk-url-table table');
  if(!table) return alert('Geen data om te exporteren.');
  const rows=[];
  table.querySelectorAll('tr').forEach(tr=>{
    const cols=Array.from(tr.querySelectorAll('td,th')).map(td=>td.textContent.trim());
    rows.push(cols);
  });
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb,ws,'Bulk URLs');
  const datum=new Date().toLocaleDateString('nl-NL').replaceAll('/','-');
  XLSX.writeFile(wb,`bulk-urls-${datum}.xlsx`);
}
// filename label
document.addEventListener('DOMContentLoaded',()=>{
  const inp=document.getElementById('bulkFile'); const span=document.getElementById('fileName-url');
  if(inp) inp.addEventListener('change',()=>{ span.textContent = inp.files[0]? inp.files[0].name : ''; });
});
