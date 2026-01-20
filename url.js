/********************************************
 *  UNIVERSAL HELPERS FOR LIVE + BULK SLUG SYSTEM
 ********************************************/

/* Slugify */
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/*
 * Herkent technische patronen zoals 18V/54V en vervangt ze tijdelijk
 * zodat split("/") het NIET kapot kan maken.
 */
function protectTechCombinations(text) {
  return text.replace(/(\d+[a-zA-Z]+)\/(\d+[a-zA-Z]+)/g, function(_, v1, v2) {
    return `__TECH_${v1}_${v2}__`; 
  });
}

/*
 * Zet placeholders weer terug na splitting
 */
function restoreTechCombinations(str) {
  return str.replace(/__TECH_([0-9a-zA-Z]+)_([0-9a-zA-Z]+)__/g, function(_, v1, v2) {
    return `${v1}-${v2}`; // 18V-54V
  });
}

/* Verwerk elk segment afzonderlijk */
function processPureSegment(text) {
  if (!text) return null;

  // & → en
  text = text.replace(/&/g, " en ");

  // Accu's → accus
  text = text
    .replace(/'s\b/gi, "s")
    .replace(/'/g, "");

  // Placeholders terugzetten (18V-54V)
  text = restoreTechCombinations(text);

  return slugify(text);
}

/* Verwerkt complete pad input */
function generateSubmapSlug(rawInput) {
  if (!rawInput) return "";

  // Stap 1: bescherm technische waardes
  let text = protectTechCombinations(rawInput);

  // Stap 2: split op echte submappen
  const segments = text
    .split("/")
    .map(s => restoreTechCombinations(s.trim())) // haal placeholder terug
    .map(processPureSegment)
    .filter(Boolean);

  // Combineer tot pad
  return segments.join("/");
}

/************************************
 *  LIVE URL GENERATOR (with submaps)
 ************************************/

function generateURLLive() {
  const input = document.getElementById("inputField");
  let text = (input.value || "").trim();

  const slugPath = generateSubmapSlug(text);

  document.getElementById("result").textContent =
    slugPath ? slugPath : "";

  document.getElementById("resultURL").textContent =
    slugPath ? "https://toolmax.nl/" + slugPath : "";

  const show = !!slugPath;
  document.getElementById("copyButton1").style.display = show ? "inline-flex" : "none";
  document.getElementById("copyButton2").style.display = show ? "inline-flex" : "none";
}

function copyToClipboardAlle(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.textContent.trim();
  const btn = event.target;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = "Copied";
    btn.style.background = "#609942";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

function clearFields3() {
  document.getElementById("inputField").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("resultURL").textContent = "";
  document.getElementById("copyButton1").style.display = "none";
  document.getElementById("copyButton2").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("inputField")?.addEventListener("input", generateURLLive);
});


/************************************
 *  BULK URL GENERATOR (with submaps)
 ************************************/

function generateBulkURLs() {
  const fileInput = document.getElementById("bulkFile");
  const file = fileInput.files[0];
  if (!file) { alert("Upload eerst een Excel-bestand."); return; }

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!rows.length) { alert("Het bestand is leeg."); return; }

    let html = `
      <table>
        <thead>
          <tr>
            <th>Originele tekst</th>
            <th>Slug</th>
            <th>Volledige URL</th>
          </tr>
        </thead>
        <tbody>
    `;

    rows.forEach((row) => {
      const input = row[0];
      if (!input) return;

      const slugPath = generateSubmapSlug(input.toString().trim());
      const url = "https://toolmax.nl/" + slugPath;

      html += `
        <tr>
          <td>${input}</td>
          <td>${slugPath}</td>
          <td>${url}</td>
        </tr>
      `;
    });

    html += "</tbody></table>";
    document.getElementById("bulk-url-table").innerHTML = html;
  };

  reader.readAsArrayBuffer(file);
}

function clearBulkURLs() {
  document.getElementById("bulkFile").value = "";
  document.getElementById("bulk-url-table").innerHTML = "";
}

function exportBulkURLs() {
  const table = document.querySelector("#bulk-url-table table");
  if (!table) return alert("Geen data om te exporteren.");

  const rows = [];
  table.querySelectorAll("tr").forEach((tr) => {
    const cols = [...tr.querySelectorAll("td,th")].map((td) => td.textContent.trim());
    rows.push(cols);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Bulk URLs");

  const datum = new Date().toLocaleDateString("nl-NL").replaceAll("/", "-");
  XLSX.writeFile(wb, `bulk-urls-${datum}.xlsx`);
}

document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById("bulkFile");
  const span = document.getElementById("fileName-url");

  if (inp) {
    inp.addEventListener("change", () => {
      span.textContent = inp.files[0] ? inp.files[0].name : "";
    });
  }
});
