// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Swiper
  if (typeof Swiper !== "undefined") {
    new Swiper(".menuSwiper", {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 20,
      loop: false,
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 1024: { slidesPerView: 4 }, 768: { slidesPerView: 3 }, 480: { slidesPerView: 2 }, 0: { slidesPerView: 1 } },
    });
  }

  // Newsletter Modal
  const form = document.querySelector(".newsletter-form");
  const modal = document.getElementById("newsletterModal");
  const closeBtn = document.getElementById("closeNewsletter");

  if (form && modal && closeBtn) {
    form.addEventListener("submit", e => { e.preventDefault(); modal.style.display = "flex"; form.reset(); });
    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  }
});
