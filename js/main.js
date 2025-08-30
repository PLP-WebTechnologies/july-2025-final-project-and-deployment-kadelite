// ===== Utilities =====
function qs(sel, ctx = document) {
  return ctx.querySelector(sel);
}
function qsa(sel, ctx = document) {
  return Array.from(ctx.querySelectorAll(sel));
}

// ===== Nav: mobile toggle and active link =====
const navToggle = qs("#navToggle");
const nav = qs("#primaryNav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Highlight active link
qsa("#primaryNav a").forEach((a) => {
  if (
    a.getAttribute("href") === location.pathname.split("/").pop() ||
    (location.pathname.endsWith("/") && a.getAttribute("href") === "index.html")
  ) {
    a.classList.add("active");
  }
});

// ===== Footer year =====
const yearEl = qs("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Scroll reveal using IntersectionObserver =====
const revealEls = qsa(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// ===== Contact form validation =====
const form = qs("#contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = qs("#name").value.trim();
    const email = qs("#email").value.trim();
    const message = qs("#message").value.trim();

    let valid = true;

    // Name
    if (!name) {
      qs("#nameError").textContent = "Name is required.";
      valid = false;
    } else {
      qs("#nameError").textContent = "";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      qs("#emailError").textContent = "Enter a valid email address.";
      valid = false;
    } else {
      qs("#emailError").textContent = "";
    }

    // Message
    if (message.length < 10) {
      qs("#messageError").textContent =
        "Message should be at least 10 characters.";
      valid = false;
    } else {
      qs("#messageError").textContent = "";
    }

    const status = qs("#formStatus");
    if (valid) {
      status.textContent = "✅ Message sent! (Demo)";
      form.reset();
      setTimeout(() => (status.textContent = ""), 3000);
    } else {
      status.textContent = "⚠️ Please fix the errors above.";
      setTimeout(() => (status.textContent = ""), 3000);
    }
  });
}
