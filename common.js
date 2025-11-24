// Helperfunctie: split regels op enters en maak paragrafen met witruimte
function formatParagraphs(rawText) {
  if (!rawText) return "";
  const lines = rawText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  return lines.map(p => `<p>${p}</p>\n`).join("");
}

/* ---------- VISUELE FEEDBACK OP "GENEREER" KNOP ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".btn.generate, .generate, .generatesteps");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Genereerd”
      btn.textContent = "Genereerd";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".encrypt");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Encrypted”
      btn.textContent = "Encrypted";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const generateButtons = document.querySelectorAll(".decrypt");

  generateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // originele tekst opslaan
      const originalText = btn.textContent;

      // direct veranderen naar “Decrypted”
      btn.textContent = "Decrypted";
      btn.style.background = "#609942";
      btn.style.color = "#fff";

      // na 2 seconden terug naar originele staat
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    });
  });
});

// LIGHT/DARK MODE SWITCH
const toggleMain = document.getElementById("darkModeToggle");
const toggleMobile = document.getElementById("darkModeToggleMobile");
const toggleSidebar = document.getElementById("darkModeToggleSidebar");

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    toggleMain.checked = true;
    if (toggleMobile) toggleMobile.checked = true;
    if (toggleSidebar) toggleSidebar.checked = true;
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    toggleMain.checked = false;
    if (toggleMobile) toggleMobile.checked = false;
    if (toggleSidebar) toggleSidebar.checked = false;
    localStorage.setItem("theme", "light");
  }
}

// Herstel uit localStorage bij laden
setTheme(localStorage.getItem("theme") === "dark");

// Hoofd toggle
toggleMain.addEventListener("change", () => {
  setTheme(toggleMain.checked);
});

// Mobiel toggle
if (toggleMobile) {
  toggleMobile.addEventListener("change", () => {
    setTheme(toggleMobile.checked);
  });
}

// Sidebar toggle
if (toggleSidebar) {
  toggleSidebar.addEventListener("change", () => {
    setTheme(toggleSidebar.checked);
  });
}


// --- SELECTORS ---
const burger = document.getElementById("hamburgerToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileMenuClose");

// --- UPDATE HAMBURGER STICKY STATE ---
function updateHamburgerSticky() {
  const isDesktopOpen = window.innerWidth >= 768 && !mobileMenu.classList.contains("closed");
  const isMobileOpen = window.innerWidth < 768 && mobileMenu.classList.contains("active");

  if (isDesktopOpen || isMobileOpen) {
    burger.classList.add("sticky");
  } else {
    burger.classList.remove("sticky");
  }
}

// --- HAMBURGER OPENEN / SLUITEN ---
burger.addEventListener("click", () => {
  if (window.innerWidth >= 768) {
    // Desktop versie: .closed togglen
    mobileMenu.classList.toggle("closed");
  } else {
    // Mobiel versie: .active togglen
    mobileMenu.classList.toggle("active");
  }

  updateHamburgerSticky();
});

// --- SLUITKNOP (kruisje) ---
if (mobileClose) {
  mobileClose.addEventListener("click", () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add("closed");
    } else {
      mobileMenu.classList.remove("active");
    }

    updateHamburgerSticky();
  });
}

// --- MENUITEMS (tabs) ---
document.querySelectorAll("#mobileMenu li").forEach(item => {
  item.addEventListener("click", () => {
    const tab = item.getAttribute("data-tab");

    // Tabs activeren
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    document.querySelector(`#tab-${tab}`).classList.add("active");

    // Buttons highlighten
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.tab-button[data-tab="${tab}"]`)?.classList.add("active");

    // Active state in menu
    document.querySelectorAll("#mobileMenu li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    // Alleen op mobiel sluiten
    if (window.innerWidth < 768) {
      mobileMenu.classList.remove("active");
    }

    updateHamburgerSticky();
  });
});

// DESKTOP SIDEBAR
const desktopSidebar = document.getElementById("desktopSidebar");
const desktopSidebarClose = document.getElementById("desktopSidebarClose");

// Sluiten (desktop)
desktopSidebarClose.addEventListener("click", () => {
  desktopSidebar.classList.add("closed");
});

// Klik op hamburger opent desktop sidebar (alleen desktop)
burger.addEventListener("click", () => {
  if (window.innerWidth >= 768) {
    desktopSidebar.classList.remove("closed");
  }
});

// Sidebar tab click
document.querySelectorAll("#desktopSidebar li").forEach(item => {
  item.addEventListener("click", () => {
    const tab = item.getAttribute("data-tab");

    // Activate tab content
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    document.querySelector(`#tab-${tab}`).classList.add("active");

    // Highlight top buttons
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.tab-button[data-tab="${tab}"]`)?.classList.add("active");

    // Active in sidebar
    document.querySelectorAll("#desktopSidebar li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});