document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".brew-card");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentIndex = 0;

  if (!track || cards.length === 0) return;

  // How many cards are visible at once
  const cardsPerView = 3;

  // Total number of "pages"
  const totalSlides = Math.ceil(cards.length / cardsPerView);

  // Create navigation dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".slider-dots button");

  function goToSlide(index) {
    // Loop back to first slide if at the end
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentIndex = index;

    // Move track (each slide = 100% / totalSlides)
    const translateX = -(index * 100);
    track.style.transform = `translateX(${translateX}%)`;

    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === currentIndex)
    );
  }

  // Auto-slide every 3.5s
  setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 3500);
});
