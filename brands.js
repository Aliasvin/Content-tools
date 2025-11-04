// POPULAIRE MERKEN
let merkCount = 0;

// --- Helper: slugify tekst naar nette URL-vorm ---
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // verwijdert accenten
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") // vervang vreemde tekens door streepje
    .replace(/^-+|-+$/g, ""); // verwijder streepjes aan begin/einde
}

function addMerk(name = '', category = '', link = '') {
  merkCount++;
  const container = document.getElementById('merken-container');

  const div = document.createElement('div');
  div.className = 'merk-block';
  div.innerHTML = `
    <button class="btn-remove" title="Verwijderen">×</button>
    <h4>Merk ${merkCount}</h4>

    <label>Merknaam</label>
    <input type="text" class="merk-naam" placeholder="Bijv. Makita" value="${name}">

    <label>Categorie</label>
    <input type="text" class="merk-categorie" placeholder="Bijv. afkortzaag" value="${category}">

    <label>Link (automatisch gegenereerd)</label>
    <input type="text" class="merk-link" placeholder="/makita/afkortzaag.html" value="${link}">
  `;
  // Voeg merk-blok toe vóór de “+ Merk toevoegen” knop
  const addBtn = container.querySelector('.add');
  if (addBtn) {
    container.insertBefore(div, addBtn);
  } else {
    container.appendChild(div);
  }

  // Verwijderknop
  div.querySelector('.btn-remove').addEventListener('click', () => {
    div.remove();
    renumberMerken();
    generateMerkenHTML();
  });

  // Live updates bij invoer
  div.addEventListener('input', e => {
    const merkInput = div.querySelector('.merk-naam');
    const catInput = div.querySelector('.merk-categorie');
    const linkInput = div.querySelector('.merk-link');

    if (e.target === merkInput || e.target === catInput) {
      const merkSlug = slugify(merkInput.value);
      const catSlug = slugify(catInput.value);
      if (merkSlug && catSlug) {
        linkInput.value = `/${merkSlug}/${catSlug}.html`;
      } else if (merkSlug) {
        linkInput.value = `/${merkSlug}/`;
      } else {
        linkInput.value = '';
      }
    }

    generateMerkenHTML();
  });

  generateMerkenHTML();
}

function renumberMerken() {
  document.querySelectorAll('#merken-container .merk-block').forEach((b, i) => {
    b.querySelector('h4').textContent = 'Merk ' + (i + 1);
  });
  merkCount = document.querySelectorAll('#merken-container .merk-block').length;
}

function generateMerkenHTML() {
  const names = [...document.querySelectorAll('.merk-naam')];
  const links = [...document.querySelectorAll('.merk-link')];
  const arr = [];
  for (let i = 0; i < names.length; i++) {
    const merk = names[i].value.trim();
    const link = links[i].value.trim();
    if (merk && link) {
      arr.push(`<a class="tm-link" href="${link}">${merk}</a>`);
    }
  }
  const output = arr.length ? `<p>Populaire merken: ${arr.join(' | ')}</p>` : '';
  document.getElementById('merkenResult').textContent = output;
}

function copyMerken() {
  const btn = document.querySelector('#tab-brands .btn-copy');
  const text = document.getElementById('merkenResult').textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      btn.textContent = "Copied";
      btn.style.background = "#609942";
      btn.style.color = "#fff";
      setTimeout(() => {
        btn.textContent = "Kopieer";
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    }
  });
}

function clearMerkenFields() {
  const container = document.getElementById('merken-container');
  // Verwijder alleen de merkblokken, laat de “+ Merk toevoegen” knop staan
  container.querySelectorAll('.merk-block').forEach(el => el.remove());
  document.getElementById('merkenResult').textContent = '';
  merkCount = 0;
}

function addDefaultMerken() {
  const value = document.getElementById('defaultMerkenSelect').value;
  if (!value) return alert('Kies eerst een categorie.');
  const defaults = [
    { merk: 'Metabo', categorie: value },
    { merk: 'DeWALT', categorie: value },
    { merk: 'Makita', categorie: value },
    { merk: 'Bosch', categorie: value },
    { merk: 'Hikoki', categorie: value },
    { merk: 'Festool', categorie: value },
  ];
  defaults.forEach(m => {
    const link = `/${slugify(m.merk)}/${slugify(m.categorie)}.html`;
    addMerk(m.merk, m.categorie, link);
  });
}
