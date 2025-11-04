// --- Dropdown + tab integratie ---
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".tab-dropdown");
  if (!dropdown) return;

  const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");

  // Toggle open/dicht
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  // Klik buiten dropdown => sluit
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
  });

  // Tabs activeren (ook in dropdown)
  const allTabs = document.querySelectorAll(".tab-button[data-tab]");
  const contents = document.querySelectorAll(".tab-content");

  function activateTab(tabKey) {
    allTabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // Activeer alle knoppen met dezelfde data-tab (boven + in dropdown)
    document.querySelectorAll(`.tab-button[data-tab="${tabKey}"]`).forEach(btn => btn.classList.add("active"));

    // Toon content
    const target = document.getElementById(`tab-${tabKey}`);
    if (target) target.classList.add("active");

    // Bewaar actieve tab
    sessionStorage.setItem("activeTab", tabKey);

    // Sluit dropdown na klik
    dropdown.classList.remove("open");
  }

  // Klikken op tabknoppen
  allTabs.forEach(btn => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // Herstel laatst actieve tab
  const savedTab = sessionStorage.getItem("activeTab");
  const firstTab = allTabs[0]?.dataset.tab;
  activateTab(savedTab || firstTab);
});
