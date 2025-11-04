const htmlInput = document.querySelector('#tab-html textarea');
const cssInput = document.querySelector('#tab-css textarea');
let previewFrame;
function createPreviewFrame() { if (!previewFrame) { previewFrame = document.createElement('iframe'); previewFrame.id = 'htmlPreview'; document.getElementById('tab-html').appendChild(previewFrame); } }
function updatePreview() { createPreviewFrame(); const htmlCode = htmlInput.value || ''; const cssCode = cssInput.value || ''; const combined = '<html><head><style>' + cssCode + '</style></head><body>' + htmlCode + '</body></html>'; const doc = previewFrame.contentDocument || previewFrame.contentWindow.document; doc.open(); doc.write(combined); doc.close(); }
htmlInput.addEventListener('input', updatePreview);
cssInput.addEventListener('input', updatePreview);
createPreviewFrame();