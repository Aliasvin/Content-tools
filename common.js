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

// Beide toggles
const darkToggle = document.getElementById("darkModeToggle");
const darkToggleMobile = document.getElementById("darkModeToggleMobile");

// Theme setter
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkToggle.checked = true;
    if (darkToggleMobile) darkToggleMobile.checked = true;
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    darkToggle.checked = false;
    if (darkToggleMobile) darkToggleMobile.checked = false;
    localStorage.setItem("theme", "light");
  }
}

// Herstel voorkeur
setTheme(localStorage.getItem("theme") === "dark");

// Event: hoofdtoggle
darkToggle.addEventListener("change", () => {
  setTheme(darkToggle.checked);
});

// Event: mobiele toggle
if (darkToggleMobile) {
  darkToggleMobile.addEventListener("change", () => {
    setTheme(darkToggleMobile.checked);
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