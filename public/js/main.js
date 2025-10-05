document.addEventListener("DOMContentLoaded", () => {
  // --- Testimonials Slider ---
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".testimonial-arrow.left");
  const nextBtn = document.querySelector(".testimonial-arrow.right");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none";
    });
  }

  showSlide(currentIndex);

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);

  // --- Newsletter Modal (keep existing) ---
  const form = document.querySelector(".newsletter-form");
  const modal = document.getElementById("newsletterModal");
  const closeBtn = document.getElementById("closeNewsletter");

  if (form && modal && closeBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      form.reset();
    });
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
});
