// --- Dropdown + tabs integratie ---
// Werkt met horizontale tabbalk + dropdown buiten container
(function () {
  const dropdown = document.querySelector(".tab-dropdown");
  const toggle = dropdown?.querySelector(".dropdown-toggle");
  const menu = dropdown?.querySelector(".dropdown-menu");
  const allTabs = document.querySelectorAll(".tab-button[data-tab]");
  const panes = document.querySelectorAll(".tab-content");

  if (!dropdown || !toggle || !menu) return;

  function openDropdown() {
    dropdown.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    const rect = toggle.getBoundingClientRect();
    menu.style.display = "block";
    menu.style.position = "fixed";
    menu.style.top = `${rect.bottom + 6}px`;
    menu.style.left = `${rect.left}px`;
  }

  function closeDropdown() {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains("open")) closeDropdown();
    else openDropdown();
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  // Tabs activeren
  function activateTab(key) {
    allTabs.forEach(b => b.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));
    document.querySelectorAll(`.tab-button[data-tab="${key}"]`).forEach(btn => btn.classList.add("active"));
    const pane = document.getElementById(`tab-${key}`);
    if (pane) pane.classList.add("active");
    sessionStorage.setItem("activeTab", key);
    closeDropdown();
  }

  allTabs.forEach(b => {
    b.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      activateTab(b.dataset.tab);
    }, { capture: true });
  });

  // Herstel actieve tab
  const saved = sessionStorage.getItem("activeTab");
  if (saved && document.getElementById(`tab-${saved}`)) {
    activateTab(saved);
  } else {
    const first = allTabs[0]?.dataset.tab;
    if (first) activateTab(first);
  }
})();
