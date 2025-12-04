// URL GENERATOR + BULK
function generateURLLive() {
  const input = document.getElementById('inputField');
  let text = (input.value || '').trim().toLowerCase();

  // Stap 1: split op categorie-scheiding "/"
  let rawSegments = text.split('/').map(s => s.trim()).filter(Boolean);

  // Hulpfunctie: slugify
  function slugify(str) {
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // verwijdert accenten
      .replace(/[^a-z0-9]+/g, '-')                      // alles naar -
      .replace(/^-+|-+$/g, '');                         // trim -
  }

  // Hulpfunctie: check of segment technische delen bevat
  function isTech(val) {
    // Laat letters en cijfers toe, inclusief varianten zoals 18v, 5ah, 2x18v
    return /^[0-9a-z]+$/i.test(val.replace(/-/g, ''));
  }

  let segments = rawSegments.map(segment => {
    // Stap 2: technische "/" binnen segment detecteren
    let sub = segment.split('/').map(s => s.trim()).filter(Boolean);

    // Case 1: ALLE subdelen zijn technische notaties → samenvoegen
    if (sub.length > 1 && sub.every(isTech)) {
      return slugify(sub.join('-'));
    }

    // Case 2: normale string → gewoon slugify
    return slugify(segment);
  });

  // Opbouw volledige slug-path
  const slugPath = segments.join('/');

  // Injectie in UI
  document.getElementById('result').textContent =
    slugPath ? slugPath + ".html" : "";

  document.getElementById('resultURL').textContent =
    slugPath ? "https://www.toolmax.nl/" + slugPath + ".html" : "";

  const show = !!slugPath;
  document.getElementById('copyButton1').style.display = show ? 'inline-flex' : 'none';
  document.getElementById('copyButton2').style.display = show ? 'inline-flex' : 'none';
}

// Bulk URL
function generateBulkURLs() {
  const fileInput = document.getElementById('bulkFile');
  const file = fileInput.files[0];
  if (!file) { alert('Upload eerst een Excel-bestand.'); return; }

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!rows.length) {
      alert('Het bestand is leeg.');
      return;
    }

    // Hulpfuncties (zelfde als live generator)
    function slugify(str) {
      return str
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    function isTech(val) {
      return /^[0-9a-z]+$/i.test(val.replace(/-/g, ''));
    }

    function processSlugPath(inputText) {
      let rawSegments = inputText.toLowerCase().split('/').map(s => s.trim()).filter(Boolean);

      let processed = rawSegments.map(segment => {
        // Subdelen binnen segment detecteren
        let sub = segment.split('/').map(s => s.trim()).filter(Boolean);

        // Als ALLE subdelen technisch zijn → binnen segment combineren
        if (sub.length > 1 && sub.every(isTech)) {
          return slugify(sub.join('-'));
        }

        // Normaal segment
        return slugify(segment);
      });

      return processed.join('/');
    }

    // HTML tabel output
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
      if (!row[0]) return;

      const inputText = row[0].toString().trim();
      const slugPath = processSlugPath(inputText);
      const fullURL = "https://www.toolmax.nl/" + slugPath + ".html";

      html += `
        <tr>
          <td>${inputText}</td>
          <td>${slugPath}.html</td>
          <td>${fullURL}</td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    document.getElementById('bulk-url-table').innerHTML = html;
  };

  reader.readAsArrayBuffer(file);
}
