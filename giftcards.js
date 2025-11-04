/* ---------- CADEAUKAART TAB (encryptie & decryptie) ---------- */

// ROT13 + nummerrotatie
function rot13(input) {
  return input.replace(/[a-zA-Z0-9]/g, function (char) {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    if (lower.includes(char)) return lower[(lower.indexOf(char) + 13) % 26];
    if (upper.includes(char)) return upper[(upper.indexOf(char) + 13) % 26];
    if (nums.includes(char)) return nums[(nums.indexOf(char) + 5) % 10];
    return char;
  });
}

/* ---------- ENCRYPT / DECRYPT ---------- */
function encryptText() {
  const input = document.getElementById("inputText").value.trim();
  if (!input) return alert("Voer een code in om te encrypten.");
  const encrypted = rot13(input);
  document.getElementById("outputText").textContent = encrypted;
  addToLog(input, encrypted, "Encrypted");
}

function decryptText() {
  const input = document.getElementById("inputText").value.trim();
  if (!input) return alert("Voer een code in om te decrypten.");
  const decrypted = rot13(input);
  document.getElementById("outputText").textContent = decrypted;
  addToLog(input, decrypted, "Decrypted");
}

/* ---------- CLEAR / COPY ---------- */
function clearFields5() {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").textContent = "";
}

function copyOutput() {
  const btn = document.querySelector('#tab-giftcards .btn-copy');
  const text = document.getElementById("outputText").textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      btn.textContent = "Copied";
      btn.style.background = "#609942";
      btn.style.color = "#fff";
      setTimeout(() => {
        btn.textContent = "Copy output";
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    }
  });
}

/* ---------- LOG FUNCTIES ---------- */
function addToLog(original, result, action) {
  const logList = document.getElementById("logList");
  const date = new Date().toLocaleDateString("nl-NL"); // alleen datum

  const li = document.createElement("li");
  li.classList.add("log-item");
  li.innerHTML = `
    <span class="log-text">${action}: ${original} → ${result} [voorraad: ${date}]</span>
    <div class="log-actions">
      <button class="copy-mini" title="Kopieer">Copy</button>
      <button class="print-mini" title="Print label">Print</button>
    </div>
  `;
  logList.appendChild(li);

// Copy-knop
li.querySelector(".copy-mini").addEventListener("click", (e) => {
  const btn = e.target;
  const copyString = `${result} voor voorraad [${date}]`;
  navigator.clipboard.writeText(copyString).then(() => {
    btn.textContent = "Copied";
    btn.style.background = "#609942";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
});

  // Print-knop
  li.querySelector(".print-mini").addEventListener("click", () => {
    printEncryptedLabel(result);
  });

  saveLog(original, result, date, action);
}

/* ---------- PRINT LABEL FUNCTIE ---------- */
function printEncryptedLabel(code) {
  const safe = String(code).replace(/"/g, "&quot;");
  const w = window.open("", "_blank");
  w.document.write(`
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Barcode label</title>
  <style>
    @page { size: 62mm 29mm; margin: 0mm; }
    html, body { width: 62mm; height: 29mm; margin: 0; padding: 0; }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
    }
    .wrap { width: 58mm; text-align: center; }
    #barcode { width: 100%; height: 15mm; }
    .txt { font-size: 10pt; margin-top: 0; word-break: break-all; }
  </style>
</head>
<body>
  <div class="wrap">
    <svg id="barcode"></svg>
    <div class="txt">${safe}</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
  <script>
    JsBarcode("#barcode", "${safe}", {
      format: "CODE128",
      displayValue: false,
      margin: 0
    });
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 300);
    };
  <\/script>
</body>
</html>
  `);
  w.document.close();
}

/* ---------- OPSLAAN / LADEN / EXPORTEREN ---------- */
function saveLog(original, result, date, action) {
  const log = JSON.parse(localStorage.getItem("cadeauLog")) || [];
  log.push({ original, result, date, action });
  localStorage.setItem("cadeauLog", JSON.stringify(log));
}

function loadLog() {
  const log = JSON.parse(localStorage.getItem("cadeauLog")) || [];
  const logList = document.getElementById("logList");
  logList.innerHTML = "";
  log.forEach(entry => {
    const li = document.createElement("li");
    li.classList.add("log-item");
    li.innerHTML = `
      <span class="log-text">${entry.action}: ${entry.original} → ${entry.result} [voorraad: ${entry.date}]</span>
      <div class="log-actions">
        <button class="copy-mini" title="Kopieer">Copy</button>
        <button class="print-mini" title="Print label">Print</button>
      </div>
    `;
    logList.appendChild(li);

    li.querySelector(".copy-mini").addEventListener("click", (e) => {
  const btn = e.target;
  const copyString = `${entry.result} voor voorraad [${entry.date}]`;
  navigator.clipboard.writeText(copyString).then(() => {
    btn.textContent = "Copied";
    btn.style.background = "#609942";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
});


    li.querySelector(".print-mini").addEventListener("click", () => {
      printEncryptedLabel(entry.result);
    });
  });
}

/* ---------- LOG WISSEN ---------- */
function clearLog() {
  if (confirm("Weet je zeker dat je het log wilt verwijderen?")) {
    localStorage.removeItem("cadeauLog");
    document.getElementById("logList").innerHTML = "";
  }
}

/* ---------- EXPORT FUNCTIE ---------- */
function exportCadeauLog() {
  const log = JSON.parse(localStorage.getItem("cadeauLog")) || [];
  if (!log.length) return alert("Geen loggegevens om te exporteren.");
  const rows = [["Actie", "Origineel", "Resultaat", "Datum"]];
  log.forEach(e => rows.push([e.action, e.original, e.result, e.date]));

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cadeaukaartlog");
  XLSX.writeFile(wb, "cadeaukaart-log.xlsx");
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadLog);
