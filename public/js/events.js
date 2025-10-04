// events.js
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
