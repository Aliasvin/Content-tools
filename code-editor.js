// INITIALIZE EDITORS
const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("htmlInput"),
  {
    mode: "htmlmixed",
    theme: "vscode-light",
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true
  }
);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("cssInput"),
  {
    mode: "css",
    theme: "vscode-light",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    hint: CodeMirror.hint.css
  }
);

// Trigger hints automatically
cssEditor.on("inputRead", function(editor, change) {
  if (change.text[0].match(/[a-zA-Z-]/)) {
    editor.showHint({ completeSingle: false });
  }
});

// LIVE PREVIEW
function updatePreview() {
  const iframe = document.getElementById("livePreview");
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(css + html);
  doc.close();
}

htmlEditor.on("change", updatePreview);
cssEditor.on("change", updatePreview);

// First load
updatePreview();



function updateEditorTheme() {
  const isDark =
    document.body.dataset.theme === "dark" ||
    document.body.classList.contains("dark");

  const theme = isDark ? "vscode-dark" : "vscode-light";

  htmlEditor.setOption("theme", theme);
  cssEditor.setOption("theme", theme);
}

// Run once
updateEditorTheme();

// Observe theme change
const observer = new MutationObserver(updateEditorTheme);
observer.observe(document.body, { attributes: true, attributeFilter: ["class","data-theme"] });
