/* ===== BULK ENCRYPTIE ===== */
let workbookData = null;
let encryptedResults = [];

const fileInputBulk   = document.getElementById('fileInput-bulk');
const fileNameBulk    = document.getElementById('fileName-bulk');
const sheetSelect     = document.getElementById('sheetSelect');
const columnSelect    = document.getElementById('columnSelect');
const encryptAllBtn   = document.getElementById('encryptAll');
const downloadBtn     = document.getElementById('downloadExcel');
const bulkTableWrap   = document.getElementById('bulk-table');
const bulkLog         = document.getElementById('bulk-log');

if (fileInputBulk) {
  fileInputBulk.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    fileNameBulk.textContent = file ? file.name : 'Geen bestand gekozen';
    if (file) readWorkbook(file);
  });
}

function readWorkbook(file){
  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    workbookData = XLSX.read(data, { type: 'array' });

    // Sheets vullen
    sheetSelect.innerHTML = '';
    workbookData.SheetNames.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name; opt.textContent = name;
      sheetSelect.appendChild(opt);
    });

    if (workbookData.SheetNames.length > 0) loadColumns(workbookData.SheetNames[0]);
  };
  reader.readAsArrayBuffer(file);
}

sheetSelect?.addEventListener('change', (e) => {
  if (e.target.value) loadColumns(e.target.value);
});

function loadColumns(sheetName){
  const sheet = workbookData.Sheets[sheetName];
  const json  = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const header = json[0] || [];
  columnSelect.innerHTML = '';
  header.forEach((name, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = name || `Kolom ${i+1}`;
    columnSelect.appendChild(opt);
  });
}

encryptAllBtn?.addEventListener('click', () => {
  const sheetName = sheetSelect.value;
  const colIndex  = parseInt(columnSelect.value);
  if (!workbookData || !sheetName || isNaN(colIndex)) {
    alert('Selecteer eerst een bestand, sheet en kolom.');
    return;
  }

  const sheet = workbookData.Sheets[sheetName];
  const rows  = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  encryptedResults = [];
  // start bij rij 1 (rij 0 is header)
  for (let r = 1; r < rows.length; r++) {
    const cell = rows[r]?.[colIndex];
    if (cell !== undefined && cell !== null && String(cell).trim() !== '') {
      const original  = String(cell);
      const encrypted = rot13(original);
      encryptedResults.push({ original, encrypted });
      addBulkLog(original, encrypted);
    }
  }

  renderBulkTable(encryptedResults);
  downloadBtn.style.display = encryptedResults.length ? 'inline-block' : 'none';
});

// Zelfde rot13 als elders
function rot13(input){
  return String(input).replace(/[a-zA-Z0-9]/g, function (char) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums  = "0123456789";
    if (lower.includes(char)) return lower[(lower.indexOf(char) + 13) % 26];
    if (upper.includes(char)) return upper[(upper.indexOf(char) + 13) % 26];
    if (nums.includes(char))  return nums[(nums.indexOf(char) + 5) % 10];
    return char;
  });
}

function renderBulkTable(data){
  if (!data.length) { bulkTableWrap.innerHTML = '<p>Geen resultaten.</p>'; return; }
  let html = `<table>
    <thead><tr><th>Origineel</th><th>Encryptie</th><th>Kopieer</th></tr></thead><tbody>`;
  data.forEach(row => {
    html += `<tr>
      <td>${escapeHTML(row.original)}</td>
      <td>${escapeHTML(row.encrypted)}</td>
      <td><button class="btn-copy" type="button" onclick="navigator.clipboard.writeText('${escapeAttr(row.encrypted)}')">Copy</button></td>
    </tr>`;
  });
  html += `</tbody></table>`;
  bulkTableWrap.innerHTML = html;
}

function addBulkLog(original, encrypted){
  const date = new Date().toLocaleDateString('nl-NL'); // alleen datum
  const div = document.createElement('div');
  div.className = 'log-entry';
  div.innerHTML = `
    <span>"${escapeHTML(original)}" → ${escapeHTML(encrypted)} [voorraad: ${date}]</span>
    <button class="btn-copy" type="button"
      onclick="navigator.clipboard.writeText('${escapeAttr(encrypted)} op voorraad [${date}]')">Copy</button>`;
  bulkLog.appendChild(div);

  // localStorage
  const stored = JSON.parse(localStorage.getItem('bulkEncryptLog')) || [];
  stored.push({ original, encrypted, date });
  localStorage.setItem('bulkEncryptLog', JSON.stringify(stored));
}

function clearBulkLog(){
  if (confirm('Weet je zeker dat je het log wilt wissen?')) {
    localStorage.removeItem('bulkEncryptLog');
    bulkLog.innerHTML = '';
  }
}

function escapeHTML(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function escapeAttr(s){ return String(s).replace(/['"\\]/g, m => ({'"':'&quot;',"'":'&#39;','\\':'\\\\'}[m])); }

/* Download Excel */
downloadBtn?.addEventListener('click', () => {
  if (!encryptedResults.length) return alert('Geen data om te downloaden.');
  const today = new Date();
  const dateStr = today.toISOString().slice(0,10); // jjjj-mm-dd

  const data = encryptedResults.map(r => ({
    Origineel: r.original,
    Encryptie: r.encrypted,
    'Datum op voorraad': new Date().toLocaleDateString('nl-NL')
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Encrypted Codes');
  XLSX.writeFile(wb, `encrypted_codes_${dateStr}.xlsx`);
});
