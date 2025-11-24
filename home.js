// --- Tabs + Home grid + Dropdown integratie ---
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");
  const dropdown = document.querySelector(".tab-dropdown");
  const dropdownToggle = dropdown?.querySelector(".dropdown-toggle");
  const savedTab = sessionStorage.getItem("activeTab");

  // --- Activeer tab ---
  function activateTab(key) {
  // Reset alle actieve tabknoppen en inhoud
  document.querySelectorAll(".tab-button").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  // Reset de 'Meer' knop altijd eerst
  const dropdown = document.querySelector(".tab-dropdown");
  const dropdownToggle = dropdown?.querySelector(".dropdown-toggle");
  if (dropdownToggle) dropdownToggle.classList.remove("active");

  // Activeer de juiste tab en inhoud
  const btn = document.querySelector(`.tab-button[data-tab="${key}"]`);
  const pane = document.getElementById(`tab-${key}`);

  if (btn) btn.classList.add("active");
  if (pane) pane.classList.add("active");

  // Als de actieve knop onder 'Meer' zit → kleur dropdown groen
  if (dropdown && btn && dropdown.contains(btn)) {
    dropdownToggle.classList.add("active");
  }

  // Sla huidige tab op
  sessionStorage.setItem("activeTab", key);

  // Sluit dropdown bij tabwissel
  if (dropdown) dropdown.classList.remove("open");
}


  // --- standaard: homepagina ---
  activateTab(savedTab || "home");

  // --- Klik op tabbalk knoppen ---
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      activateTab(t.dataset.tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // --- Klik op tool-cards (home grid) ---
  document.querySelectorAll(".tool-card").forEach(card => {
  card.addEventListener("click", () => {
    const tabKey = card.dataset.tab;
    if (window.activateTab) {
      window.activateTab(tabKey);
    }
  });
});

  // --- Dropdown toggle logica ---
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", e => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("h1");

  if (header && header.textContent.trim() === "Content tools") {

    // Maak alleen de tekst klikbaar, niet het blok eromheen
    const textOnly = document.createElement("span");
    textOnly.textContent = header.textContent;
    header.textContent = "";
    header.appendChild(textOnly);

    textOnly.style.cursor = "pointer";
    textOnly.title = "Klik om terug te gaan naar startpagina";

    textOnly.addEventListener("click", () => {
      if (window.activateTab) {
        window.activateTab("home");
      }
    });
  }
});

