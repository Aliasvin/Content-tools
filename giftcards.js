/* ============================================================
   CADEAUKAART TAB – Encryptie, decryptie, logging & export
   ============================================================ */

/* ---------- ROT13 + nummerrotatie (encryptie/decryptie) ---------- */
function rot13(input) {
  return input.replace(/[a-zA-Z0-9]/g, function (char) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    if (lower.includes(char)) return lower[(lower.indexOf(char) + 13) % 26];
    if (upper.includes(char)) return upper[(upper.indexOf(char) + 13) % 26];
    if (nums.includes(char)) return nums[(nums.indexOf(char) + 5) % 10];
    return char;
  });
}

/* ---------- GIFT CARD CONFIGURATIE ---------- */
const giftCards = [
  { id: "gift10", label: "€10" },
  { id: "gift25", label: "€25" },
  { id: "gift50", label: "€50" },
  { id: "gift75", label: "€75" },
  { id: "gift100", label: "€100" },
];

/* ---------- ENCRYPT ---------- */
function encryptGiftcards() {
  const output = document.getElementById("giftOutput");
  const logList = document.getElementById("logList");
  output.innerHTML = "";
  logList.innerHTML = "";

  giftCards.forEach(card => {
    const val = document.getElementById(card.id)?.value.trim();
    if (val) {
      const enc = rot13(val);
      const date = new Date().toLocaleDateString("nl-NL");

      // Toon resultaat
      const p = document.createElement("p");
      p.innerHTML = `<strong>${card.label}:</strong> ${enc}`;
      output.appendChild(p);

      // Voeg logregel toe
      const li = document.createElement("li");
      li.classList.add("log-item");
      li.innerHTML = `
        <span class="log-text">Encrypted ${card.label}: ${val} → ${enc} [${date}]</span>
        <div class="log-actions">
          <button class="copy-mini" title="Kopieer">Copy</button>
          <button class="print-mini" title="Print label">Print</button>
        </div>
      `;
      logList.appendChild(li);

      // ✅ Copy-knop met voorraadtekst
      li.querySelector(".copy-mini").addEventListener("click", (e) => {
        const btn = e.target;
        const copyString = `${enc} voor voorraad [${date}]`;
        navigator.clipboard.writeText(copyString).then(() => {
          btn.textContent = "Copied";
          btn.style.background = "#609942";
          btn.style.color = "#fff";
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.style.background = "";
            btn.style.color = "";
          }, 1500);
        });
      });

      // Printknop
      li.querySelector(".print-mini").addEventListener("click", () => {
        printEncryptedLabel(enc);
      });

      // Sla log op
      saveLog(val, enc, date, `Encrypted ${card.label}`);
    }
  });

  if (!output.innerHTML.trim()) {
    output.textContent = "Geen codes ingevoerd.";
  }
}

/* ---------- DECRYPT ---------- */
function decryptGiftcards() {
  const output = document.getElementById("giftOutput");
  output.innerHTML = "";

  giftCards.forEach(card => {
    const val = document.getElementById(card.id)?.value.trim();
    if (val) {
      const dec = rot13(val);
      const p = document.createElement("p");
      p.innerHTML = `<strong>${card.label}:</strong> ${dec}`;
      output.appendChild(p);
    }
  });

  if (!output.innerHTML.trim()) {
    output.textContent = "Geen codes ingevoerd.";
  }
}

/* ---------- CLEAR & COPY ---------- */
function clearGiftcards() {
  giftCards.forEach(c => (document.getElementById(c.id).value = ""));
  document.getElementById("giftOutput").innerHTML = "";
}

function copyGiftOutput() {
  const text = [...document.querySelectorAll("#giftOutput p")]
    .map(p => p.textContent)
    .join("\n");
  if (!text) return alert("Geen resultaat om te kopiëren.");
  navigator.clipboard.writeText(text);
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

/* ---------- LOG OPSLAAN / LADEN / EXPORTEREN ---------- */
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
      <span class="log-text">${entry.action}: ${entry.original} → ${entry.result} [${entry.date}]</span>
      <div class="log-actions">
        <button class="copy-mini" title="Kopieer">Copy</button>
        <button class="print-mini" title="Print label">Print</button>
      </div>
    `;
    logList.appendChild(li);

    // ✅ Copy met voorraadtekst
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
        }, 1500);
      });
    });

    li.querySelector(".print-mini").addEventListener("click", () => {
      printEncryptedLabel(entry.result);
    });
  });
}

function clearLog() {
  if (confirm("Weet je zeker dat je het log wilt verwijderen?")) {
    localStorage.removeItem("cadeauLog");
    document.getElementById("logList").innerHTML = "";
  }
}

function exportGiftcards() {
  const log = JSON.parse(localStorage.getItem("cadeauLog")) || [];
  if (!log.length) return alert("Geen loggegevens om te exporteren.");

  const rows = [["Actie", "Origineel", "Resultaat", "Datum"]];
  log.forEach(e => rows.push([e.action, e.original, e.result, e.date]));

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cadeaukaartlog");

  const datum = new Date().toISOString().split("T")[0];
  XLSX.writeFile(wb, `cadeaukaart-log-${datum}.xlsx`);
}
// Maak 'm expliciet global voor inline onclick
window.exportGiftcards = exportGiftcards;

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", loadLog);
