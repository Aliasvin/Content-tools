// CADEAUKAART (ROT13+NUM)
function rot13(input){
  return input.replace(/[a-zA-Z0-9]/g, function(char){
    const lower='abcdefghijklmnopqrstuvwxyz', upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ', nums='0123456789';
    if(lower.includes(char)) return lower[(lower.indexOf(char)+13)%26];
    if(upper.includes(char)) return upper[(upper.indexOf(char)+13)%26];
    if(nums.includes(char))  return nums[(nums.indexOf(char)+5)%10];
    return char;
  });
}
function encryptText(){
  const input=document.getElementById('inputText').value.trim();
  if(!input) return alert('Voer een code in om te encrypten.');
  const encrypted=rot13(input);
  document.getElementById('outputText').textContent=encrypted;
  addToLog(input, encrypted, 'Encrypted');
}
function decryptText(){
  const input=document.getElementById('inputText').value.trim();
  if(!input) return alert('Voer een code in om te decrypten.');
  const decrypted=rot13(input);
  document.getElementById('outputText').textContent=decrypted;
  addToLog(input, decrypted, 'Decrypted');
}
function clearFields5(){ document.getElementById('inputText').value=''; document.getElementById('outputText').textContent=''; }
function copyOutput(){ const t=document.getElementById('outputText').textContent.trim(); if(!t) return alert('Geen output.'); navigator.clipboard.writeText(t).then(()=>alert('Gekopieerd!')); }

function addToLog(original, result, action){
  const logList=document.getElementById('logList');
  const date = new Date().toLocaleDateString('nl-NL'); // alleen datum
  const li=document.createElement('li'); li.className='log-item';
  li.innerHTML = `<span class="log-text">${action}: ${original} → ${result} [voorraad: ${date}]</span>
  <button class="copy-mini" title="Kopieer naar klembord">Copy</button>`;
  logList.appendChild(li);
  li.querySelector('.copy-mini').addEventListener('click',()=>{
    const copyString = `${result} op voorraad [${date}]`;
    navigator.clipboard.writeText(copyString).then(()=>{
      li.querySelector('.copy-mini').textContent='Copied';
      setTimeout(()=>li.querySelector('.copy-mini').textContent='Copy',1200);
    });
  });
  saveLog(original, result, date, action);
}
function saveLog(original, result, date, action){
  const log=JSON.parse(localStorage.getItem('cadeauLog'))||[];
  log.push({original,result,date,action});
  localStorage.setItem('cadeauLog', JSON.stringify(log));
}
function loadLog(){
  const log=JSON.parse(localStorage.getItem('cadeauLog'))||[];
  const list=document.getElementById('logList'); list.innerHTML='';
  log.forEach(entry=>{
    const li=document.createElement('li'); li.className='log-item';
    li.innerHTML = `<span class="log-text">${entry.action}: ${entry.original} → ${entry.result} [voorraad: ${entry.date}]</span>
    <button class="copy-mini" title="Kopieer naar klembord">Copy</button>`;
    list.appendChild(li);
    li.querySelector('.copy-mini').addEventListener('click',()=>{
      const str = `${entry.result} voor voorraad [${entry.date}]`;
      navigator.clipboard.writeText(str).then(()=>{
        li.querySelector('.copy-mini').textContent='Copied';
        setTimeout(()=>li.querySelector('.copy-mini').textContent='Copy',1200);
      });
    });
  });
}
function clearLog(){
  if(confirm('Weet je zeker dat je het log wilt verwijderen?')){
    localStorage.removeItem('cadeauLog');
    document.getElementById('logList').innerHTML='';
  }
}
document.addEventListener('DOMContentLoaded', loadLog);

// Export naar Excel
function exportCadeauLog(){
  const log=JSON.parse(localStorage.getItem('cadeauLog'))||[];
  if(!log.length){ alert('Er zijn geen logregels om te exporteren.'); return; }
  const wsData=[['Actie','Originele code','Resultaat','Datum']];
  log.forEach(e=>wsData.push([e.action,e.original,e.result,e.date]));
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Cadeaukaart log');
  const datum=new Date().toLocaleDateString('nl-NL').replaceAll('/','-');
  XLSX.writeFile(wb, `cadeaukaart-log-${datum}.xlsx`);
}
