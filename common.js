// Tabs + sessionStorage
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");
  const saved = sessionStorage.getItem("activeTab");
  function activate(key){
    tabs.forEach(t=>t.classList.remove("active"));
    contents.forEach(c=>c.classList.remove("active"));
    const btn = document.querySelector(`.tab-button[data-tab="${key}"]`) || tabs[0];
    const pane = document.getElementById(`tab-${key}`) || contents[0];
    btn.classList.add("active"); pane.classList.add("active");
    sessionStorage.setItem("activeTab", btn.dataset.tab);
  }
  activate(saved || tabs[0].dataset.tab);
  tabs.forEach(t=>t.addEventListener("click", ()=>activate(t.dataset.tab)));
});

