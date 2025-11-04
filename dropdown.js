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

  // --- Tabs activeren ---
  function activateTab(key) {
    allTabs.forEach(b => b.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));
    dropdown.classList.remove("has-active"); // reset groene status

    // Activeer huidige tab
    const btns = document.querySelectorAll(`.tab-button[data-tab="${key}"]`);
    btns.forEach(b => b.classList.add("active"));

    // Toon juiste tab-pane
    const pane = document.getElementById(`tab-${key}`);
    if (pane) pane.classList.add("active");

    // Check of de tab binnen de dropdown zit
    const inside = dropdown.querySelector(`[data-tab="${key}"]`);
    if (inside) {
      dropdown.classList.add("has-active"); // 'Meer' knop groen
    }

    // Sla op welke tab actief is
    sessionStorage.setItem("activeTab", key);

    // Sluit dropdown na klik
    closeDropdown();
  }

  // --- Tab klikken ---
  allTabs.forEach(b => {
    b.addEventListener(
      "click",
      ev => {
        ev.preventDefault();
        ev.stopPropagation();
        activateTab(b.dataset.tab);
      },
      { capture: true }
    );
  });

  // --- Dropdown toggle ---
  toggle.addEventListener("click", e => {
    e.stopPropagation();
    if (dropdown.classList.contains("open")) closeDropdown();
    else openDropdown();
  });

  // --- Sluiten buiten dropdown ---
  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDropdown();
  });

  // --- Herstel actieve tab na reload ---
  const saved = sessionStorage.getItem("activeTab");
  if (saved && document.getElementById(`tab-${saved}`)) {
    activateTab(saved);
  } else {
    const first = allTabs[0]?.dataset.tab;
    if (first) activateTab(first);
  }
})();

// --- Globale functie zodat ook tool-cards tabs kunnen activeren ---
window.activateTab = function (key) {
  const allTabs = document.querySelectorAll(".tab-button[data-tab]");
  const panes = document.querySelectorAll(".tab-content");
  const dropdown = document.querySelector(".tab-dropdown");

  allTabs.forEach(b => b.classList.remove("active"));
  panes.forEach(p => p.classList.remove("active"));
  if (dropdown) dropdown.classList.remove("has-active");

  // Activeer tabbutton(s)
  const btns = document.querySelectorAll(`.tab-button[data-tab="${key}"]`);
  btns.forEach(b => b.classList.add("active"));

  // Activeer juiste pane
  const pane = document.getElementById(`tab-${key}`);
  if (pane) pane.classList.add("active");

  // Controleer of tab in dropdown zit
  if (dropdown && dropdown.querySelector(`[data-tab="${key}"]`)) {
    dropdown.classList.add("has-active");
  }

  // Opslaan
  sessionStorage.setItem("activeTab", key);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
