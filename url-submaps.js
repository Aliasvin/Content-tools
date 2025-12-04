function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isTech(val) {
  return /^[0-9a-z]+$/i.test(val.replace(/-/g, ""));
}

function processSegment(text) {
  if (!text) return null;

  // & → en
  text = text.replace(/&/g, " en ");

  const parts = text.split("/").map(s => s.trim()).filter(Boolean);

  // Technische notaties zoals 18V/54V
  if (parts.length > 1 && parts.every(isTech)) {
    return slugify(parts.join("-"));
  }

  return slugify(text);
}

// Meta title generator
function generateMetaTitle(h, s1, s2, p) {
  if (p)  return `${p} kopen? Gratis verzending bij ToolMax`;
  if (s2) return `${s2} kopen? Bekijk ons assortiment | ToolMax`;
  if (s1) return `${s1} kopen? Bekijk ons aanbod | ToolMax`;
  if (h)  return `${h} kopen? ToolMax assortiment en deals`;
  return "";
}
function generateURLSubmaps() {
  const hoofd = document.getElementById("slug-hoofdgroep").value;
  const sub1  = document.getElementById("slug-sub1").value;
  const sub2  = document.getElementById("slug-sub2").value;
  const prod  = document.getElementById("slug-product").value;

  const segments = [hoofd, sub1, sub2, prod]
    .map(processSegment)
    .filter(Boolean);

  const slugPath = segments.join("/");
  const url = slugPath ? "https://www.toolmax.nl/" + slugPath + ".html" : "";

  document.getElementById("result-submap").textContent =
    slugPath ? slugPath + ".html" : "";

  document.getElementById("resultURL-submap").textContent = url;

  const show = !!slugPath;
  document.getElementById("copyButtonSub1").style.display = show ? "inline-flex" : "none";
  document.getElementById("copyButtonSub2").style.display = show ? "inline-flex" : "none";
}

function copySubmap(id) {
  const el = document.getElementById(id);
  const text = el.textContent.trim();
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    btn.textContent = "Gekopieerd!";
    btn.style.background = "#609942";

    setTimeout(() => {
      btn.textContent = "Copy";
      btn.style.background = "";
    }, 1500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ["slug-hoofdgroep", "slug-sub1", "slug-sub2", "slug-product"]
    .forEach(id => {
      document.getElementById(id).addEventListener("input", generateURLSubmaps);
    });

  document.getElementById("copyButtonSub1").style.display = "none";
  document.getElementById("copyButtonSub2").style.display = "none";
});
function generateBulkSubmapURLs() {
  const file = document.getElementById("bulkSubmapsFile").files[0];
  if (!file) return alert("Upload eerst een Excel-bestand.");

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    let html = `
      <table>
        <thead>
          <tr>
            <th>Hoofdgroep</th>
            <th>Subgroep 1</th>
            <th>Subgroep 2</th>
            <th>Productnaam</th>
            <th>Pad preview</th>
            <th>Slug</th>
            <th>URL</th>
            <th>Meta title</th>
          </tr>
        </thead>
        <tbody>
    `;

    rows.forEach((row, i) => {
      if (i === 0) return;

      const h  = row[0] || "";
      const s1 = row[1] || "";
      const s2 = row[2] || "";
      const p  = row[3] || "";

      const segments = [h, s1, s2, p]
        .map(processSegment)
        .filter(Boolean);

      const slugPath = segments.join("/");
      const url = slugPath ? "https://www.toolmax.nl/" + slugPath + ".html" : "";
      const preview = segments.join(" → ");
      const meta = generateMetaTitle(h, s1, s2, p);

      html += `
        <tr>
          <td>${h}</td>
          <td>${s1}</td>
          <td>${s2}</td>
          <td>${p}</td>
          <td>${preview}</td>
          <td>${slugPath}.html</td>
          <td>${url}</td>
          <td>${meta}</td>
        </tr>
      `;
    });

    html += "</tbody></table>";
    document.getElementById("bulk-submap-table").innerHTML = html;
  };

  reader.readAsArrayBuffer(file);
}

function clearLiveSubmapFields() {
  document.getElementById("slug-hoofdgroep").value = "";
  document.getElementById("slug-sub1").value = "";
  document.getElementById("slug-sub2").value = "";
  document.getElementById("slug-product").value = "";

  document.getElementById("result-submap").textContent = "";
  document.getElementById("resultURL-submap").textContent = "";

  document.getElementById("copyButtonSub1").style.display = "none";
  document.getElementById("copyButtonSub2").style.display = "none";
}
