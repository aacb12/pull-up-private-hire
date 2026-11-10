// TODO: confirm these are the right contact details for the private hire side of the business
const PHONE = "447741405694";
const EMAIL = "puotl@outlook.com";

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  })
);

// Header border once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Quote form
const form = document.getElementById("quote");
const f = form.elements;

// No dates in the past; a return can't be before the outward journey
const localToday = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};
f.date.min = localToday();
f.returnDate.min = f.date.min;
f.date.addEventListener("change", () => {
  f.returnDate.min = f.date.value || localToday();
});

// Return trips show the second date and time
const returnFields = document.getElementById("return-fields");
function syncTrip() {
  const isReturn = f.trip.value === "Return";
  returnFields.hidden = !isReturn;
  f.returnDate.required = isReturn;
  f.returnTime.required = isReturn;
}
form.querySelectorAll('input[name="trip"]').forEach((r) => r.addEventListener("change", syncTrip));
syncTrip();

// Airport and route cards fill in the drop-off, then the link scrolls to the form
const finePointer = window.matchMedia("(pointer: fine)").matches;
document.querySelectorAll("[data-to]").forEach((card) =>
  card.addEventListener("click", () => {
    f.dropoff.value = card.dataset.to;
    form.classList.remove("flash");
    void form.offsetWidth; // restart the highlight animation
    form.classList.add("flash");
    // On phones, focusing would pop the keyboard up mid-scroll, so only do it with a mouse
    if (finePointer) (f.pickup.value ? f.date : f.pickup).focus({ preventScroll: true });
  })
);

function formatDate(value) {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function buildMessage() {
  const isReturn = f.trip.value === "Return";
  const lines = [
    "Hi Pull Up Private Hire, can I get a price for this journey?",
    "",
    `Journey: ${isReturn ? "Return" : "One way"}`,
    `From: ${f.pickup.value.trim()}`,
    `To: ${f.dropoff.value.trim()}`,
    `Date: ${formatDate(f.date.value)} at ${f.time.value}`,
  ];
  if (isReturn) lines.push(`Return: ${formatDate(f.returnDate.value)} at ${f.returnTime.value}`);
  lines.push(`Passengers: ${f.passengers.value}`, `Large suitcases: ${f.cases.value}`);
  if (f.flight.value.trim()) lines.push(`Flight number: ${f.flight.value.trim().toUpperCase()}`);
  lines.push("", `Name: ${f.name.value.trim()}`);
  if (f.phone.value.trim()) lines.push(`Phone: ${f.phone.value.trim()}`);
  if (f.message.value.trim()) lines.push("", f.message.value.trim());
  return lines.join("\n");
}

// No backend on Cloudflare Pages, so hand the message off to WhatsApp or email
form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
});

document.getElementById("send-email").addEventListener("click", () => {
  if (!form.reportValidity()) return;
  const subject = encodeURIComponent(`Quote request: ${f.pickup.value.trim()} to ${f.dropoff.value.trim()}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(buildMessage())}`;
});

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll(
  ".section-head, .dest-card, .panel, .features-3 li, .steps li, .about > *, .faq details, .contact > *"
);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
