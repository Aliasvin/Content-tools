// PRODUCT TEKST
function normalizeList(input) {
  if (!input) return [];
  const lines = input.split(/\n+/).map(s => s.trim()).filter(Boolean);
  if (lines.length <= 1) {
    return input.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  }
  return lines.map(l => l.replace(/\s{2,}/g, ' '));
}

function keyValueToBullet(input) {
  if (!input) return [];
  const lines = input.split(/\n+/).map(s => s.trim()).filter(Boolean);
  const bullets = [];

  lines.forEach(line => {
    const m = line.match(/^([^:]+)\s*[:\-]\s*(.+)$/);
    if (m) {
      bullets.push(`${m[1].trim()}: ${m[2].trim()}`);
    } else {
      const parts = line.split(',').map(s => s.trim()).filter(Boolean);
      bullets.push(...parts);
    }
  });

  if (bullets.length === 0) {
    return input.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  }
  return bullets;
}

function formatParagraphs(text) {
  return text
    .split(/\n+/)
    .map(p => `<p>${p.trim()}</p>`)
    .join('\n');
}

function addSpacer(html) {
  return html ? html + '<br>\n' : '';
}

function generateProductText() {
  const intro = document.getElementById('prod-intro').value.trim();
  const bk = document.getElementById('prod-bk').value.trim();
  const tech = document.getElementById('prod-tech').value.trim();
  const std = document.getElementById('prod-std').value.trim();

  let html = '';

  // INTRO
  if (intro) {
    html += formatParagraphs(intro);
  }

  // BIJZONDERE KENMERKEN
  const bkItems = normalizeList(bk);
  if (bkItems.length) {
    html = addSpacer(html);
    html += '<h2>Bijzondere kenmerken</h2>\n';
    html += '<ul>\n' + bkItems.map(i => `  <li>${i}</li>`).join('\n') + '\n</ul>\n';
  }

  // TECHNISCHE GEGEVENS
  const techItems = keyValueToBullet(tech);
  if (techItems.length) {
    html = addSpacer(html);
    html += '<h2>Technische gegevens</h2>\n';
    html += '<ul>\n' + techItems.map(i => `  <li>${i}</li>`).join('\n') + '\n</ul>\n';
  }

  // STANDAARD MEEGELEVERD
  const stdItems = normalizeList(std);
  if (stdItems.length) {
    html = addSpacer(html);
    html += '<h2>Standaard meegeleverd</h2>\n';
    html += '<ul>\n' + stdItems.map(i => `  <li>${i}</li>`).join('\n') + '\n</ul>';
  }

  document.getElementById('productResult').textContent = html.trim();
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.generate-product-text')?.addEventListener('click', generateProductText);
  ['prod-intro', 'prod-bk', 'prod-tech', 'prod-std'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', generateProductText);
  });
});

function copyProductText() {
  const btn = document.querySelector('#tab-product .btn-copy');
  const text = document.getElementById('productResult').textContent.trim();
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

function clearProductFields() {
  ['prod-intro','prod-bk','prod-tech','prod-std'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('productResult').textContent = '';
}
