/* ---------- Excel Vergelijking met kolomselectie (netjes geïntegreerd) ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const file1Input = document.getElementById("file1");
  const file2Input = document.getElementById("file2");
  const compareBtn = document.getElementById("compareBtn");
  const clearBtn = document.getElementById("clearCompare");
  const resultBox = document.getElementById("compareResult");

  // Voeg select dropdowns toe binnen file-upload containers
  const file1Wrapper = file1Input.closest(".file-upload");
  const file2Wrapper = file2Input.closest(".file-upload");

  const colSelect1 = document.createElement("select");
  const colSelect2 = document.createElement("select");

  colSelect1.id = "colSelect1";
  colSelect2.id = "colSelect2";
  colSelect1.classList.add("col-select");
  colSelect2.classList.add("col-select");
  colSelect1.disabled = true;
  colSelect2.disabled = true;

  file1Wrapper.appendChild(colSelect1);
  file2Wrapper.appendChild(colSelect2);

  // Bestand upload events
  file1Input.addEventListener("change", async () => {
    document.getElementById("fileName1").textContent = file1Input.files[0]?.name || "";
    if (file1Input.files[0]) await populateColumnSelect(file1Input.files[0], colSelect1);
  });

  file2Input.addEventListener("change", async () => {
    document.getElementById("fileName2").textContent = file2Input.files[0]?.name || "";
    if (file2Input.files[0]) await populateColumnSelect(file2Input.files[0], colSelect2);
  });

  // Vergelijk knop
  compareBtn.addEventListener("click", async () => {
    const f1 = file1Input.files[0];
    const f2 = file2Input.files[0];
    if (!f1 || !f2) return alert("Upload beide bestanden.");
    if (!colSelect1.value || !colSelect2.value) return alert("Selecteer eerst de kolommen voor vergelijking.");

    const file1Name = f1.name.replace(/\.[^/.]+$/, "");
    const file2Name = f2.name.replace(/\.[^/.]+$/, "");

    const data1 = await readExcel(f1);
    const data2 = await readExcel(f2);

    const col1 = data1.map(r => r[colSelect1.value]?.toString().trim()).filter(Boolean);
    const col2 = data2.map(r => r[colSelect2.value]?.toString().trim()).filter(Boolean);

    const set1 = new Set(col1);
    const set2 = new Set(col2);

    const resultaat = [];

    // Waarden uit bestand 1
    set1.forEach(val => {
      if (set2.has(val)) resultaat.push({ waarde: val, bestand: `${file1Name} + ${file2Name}`, type: "Dubbel" });
      else resultaat.push({ waarde: val, bestand: file1Name, type: "Uniek" });
    });

    // Waarden die alleen in bestand 2 staan
    set2.forEach(val => {
      if (!set1.has(val)) resultaat.push({ waarde: val, bestand: file2Name, type: "Uniek" });
    });

    // Samenvatting
    const uniekAantal = resultaat.filter(r => r.type === "Uniek").length;
    const dubbelAantal = resultaat.filter(r => r.type === "Dubbel").length;

    resultBox.innerHTML = `
      <h2>Resultaat</h2>  
      <p><strong>${file1Name}</strong> (kolom <em>${colSelect1.value}</em>) vergeleken met 
         <strong>${file2Name}</strong> (kolom <em>${colSelect2.value}</em>)</p>
      <p><strong>Unieke waarden:</strong> ${uniekAantal}</p>
      <p><strong>Dubbele waarden:</strong> ${dubbelAantal}</p>
      <button id="exportExcel" class="export">Exporteer naar Excel</button>
    `;

    document.getElementById("exportExcel").addEventListener("click", () => {
      exportToExcel(resultaat, file1Name, file2Name);
    });
  });

  // Resetknop
  clearBtn.addEventListener("click", () => {
    file1Input.value = "";
    file2Input.value = "";
    document.getElementById("fileName1").textContent = "";
    document.getElementById("fileName2").textContent = "";
    resultBox.innerHTML = "";
    colSelect1.innerHTML = "";
    colSelect2.innerHTML = "";
    colSelect1.disabled = true;
    colSelect2.disabled = true;
  });
});

/* ---------- Helper functies ---------- */
async function readExcel(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
}

async function populateColumnSelect(file, selectEl) {
  const data = await readExcel(file);
  if (!data.length) {
    selectEl.innerHTML = "<option>(Leeg bestand)</option>";
    selectEl.disabled = true;
    return;
  }

  const headers = Object.keys(data[0]);
  selectEl.innerHTML = `<option value="">-- Kies kolom --</option>` +
    headers.map(h => `<option value="${h}">${h}</option>`).join("");
  selectEl.disabled = false;
}

function exportToExcel(data, file1Name, file2Name) {
  const wsData = [["Waarde", "Komt voor in bestand", "Type"]];
  data.forEach(row => {
    wsData.push([row.waarde, row.bestand, row.type]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Vergelijking");

  const datum = new Date().toLocaleDateString("nl-NL").replaceAll("/", "-");
  const fileName = `vergelijking-${file1Name}_vs_${file2Name}-${datum}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
