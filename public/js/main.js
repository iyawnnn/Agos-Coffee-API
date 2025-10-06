document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     TESTIMONIALS SLIDER (simple)
     ========================= */
  try {
    const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
    const prevBtn = document.querySelector(".testimonial-arrow.left");
    const nextBtn = document.querySelector(".testimonial-arrow.right");
    let currentIndex = 0;

    if (slides.length) {
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.style.display = i === index ? "flex" : "none";
        });
      }

      showSlide(currentIndex);

      if (nextBtn)
        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % slides.length;
          showSlide(currentIndex);
        });

      if (prevBtn)
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          showSlide(currentIndex);
        });

      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }, 5000);
    }
  } catch (err) {
    console.error("Testimonials slider error:", err);
  }

  /* =========================
     BREW GUIDES - RESPONSIVE "PAGED" SLIDER
     - detects how many cards fit
     - translates by container width (no blank end)
     - builds/updates dots
     ========================= */
  try {
    const track = document.querySelector(".slider-track");
    const dotsContainer = document.querySelector(".slider-dots");
    const cards = Array.from(document.querySelectorAll(".brew-card"));

    if (track && cards.length && dotsContainer) {
      let currentPage = 0;
      let cardsPerView = 1;
      let totalPages = 1;
      let autoTimer = null;

      function calculateCardsPerView() {
        const viewport = track.parentElement; // .slider
        const containerWidth = Math.max(1, viewport.clientWidth);
        const cardRect = cards[0].getBoundingClientRect();
        const cardWidth = Math.max(1, cardRect.width);
        // compute how many cards fit (fallback 1)
        const per = Math.max(1, Math.floor(containerWidth / cardWidth));
        return per;
      }

      function buildDots() {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < totalPages; i++) {
          const btn = document.createElement("button");
          btn.type = "button";
          if (i === currentPage) btn.classList.add("active");
          btn.addEventListener("click", () => goToPage(i));
          dotsContainer.appendChild(btn);
        }
      }

      function updateLayout() {
        cardsPerView = calculateCardsPerView();
        totalPages = Math.max(1, Math.ceil(cards.length / cardsPerView));
        if (currentPage >= totalPages) currentPage = 0;
        buildDots();
        goToPage(currentPage, true);
      }

      function goToPage(pageIndex, instant = false) {
        if (totalPages <= 0) return;
        if (pageIndex >= totalPages) pageIndex = 0;
        if (pageIndex < 0) pageIndex = totalPages - 1;
        currentPage = pageIndex;

        const viewport = track.parentElement; // .slider
        const containerWidth = viewport.clientWidth;
        const translatePx = -(pageIndex * containerWidth);

        if (instant) {
          track.style.transition = "none";
          track.style.transform = `translateX(${translatePx}px)`;
          // force reflow then restore transition
          requestAnimationFrame(() => {
            track.style.transition = "";
          });
        } else {
          track.style.transform = `translateX(${translatePx}px)`;
        }

        // update dots active state
        const dots = Array.from(dotsContainer.querySelectorAll("button"));
        dots.forEach((d, i) => d.classList.toggle("active", i === currentPage));
      }

      function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => {
          goToPage((currentPage + 1) % totalPages);
        }, 3500);
      }
      function stopAuto() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      // initial layout & start
      updateLayout();
      startAuto();

      // pause on hover (desktop)
      track.parentElement.addEventListener("mouseenter", stopAuto);
      track.parentElement.addEventListener("mouseleave", startAuto);

      // recompute on resize (debounced)
      let resizeTimeout = null;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateLayout();
        }, 120);
      });
    }
  } catch (err) {
    console.error("Brew guides slider error:", err);
  }

  /* =========================
     FEATURED ITEMS - SWIPER INIT
     (only if Swiper is loaded and markup exists)
     ========================= */
  try {
    if (typeof Swiper !== "undefined") {
      const menuSwiperEl = document.querySelector(".menuSwiper");
      if (menuSwiperEl) {
        /* eslint-disable no-undef */
        new Swiper(menuSwiperEl, {
          slidesPerView: 1.6,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2.2 },
            900: { slidesPerView: 3.2 },
            1200: { slidesPerView: 3 },
          },
        });
        /* eslint-enable no-undef */
      }
    }
  } catch (err) {
    console.error("Swiper init error:", err);
  }

  /* =========================
     NEWSLETTER MODAL
     ========================= */
  try {
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
  } catch (err) {
    console.error("Newsletter modal error:", err);
  }
});
