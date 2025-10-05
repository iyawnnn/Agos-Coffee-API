// CART BUTTON HANDLER
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const card = btn.closest(".product-card");
  if (!card) return;
  const name = card.dataset.name;
  const price = card.dataset.price;
  const img = card.dataset.img;
  window.cart.addToCart(name, price, img);

  btn.animate(
    [
      { transform: "scale(1.0)" },
      { transform: "scale(0.92)" },
      { transform: "scale(1)" },
    ],
    { duration: 180, easing: "ease-out" }
  );
});

// FAQ TOGGLE HANDLER
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      // Toggle active class for color or arrow animation
      question.classList.toggle("active");

      // Expand/collapse with smooth animation
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
