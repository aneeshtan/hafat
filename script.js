const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll(".reveal");
const serviceItems = document.querySelectorAll(".service-item");
const videos = document.querySelectorAll("video");
const contactForm = document.querySelector("[data-contact-form]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

videos.forEach((video) => {
  const markReady = () => video.classList.add("is-ready");

  if (video.readyState >= 3) {
    markReady();
  } else {
    video.addEventListener("canplay", markReady, { once: true });
  }
});

serviceItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    item.style.transform = `translateX(${x}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "translateX(0)";
  });
});

if (contactForm) {
  const status = contactForm.querySelector("[data-form-status]");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      status.textContent = "Please complete the required fields before sending.";
      status.classList.remove("is-success");
      status.classList.add("is-error");
      contactForm.reportValidity();
      return;
    }

    status.textContent = "Inquiry prepared. Connect a form service or email endpoint to send it live.";
    status.classList.remove("is-error");
    status.classList.add("is-success");
    contactForm.reset();
  });
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();
