document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const cancelCheckout = document.getElementById("cancelCheckout");
  const confirmCheckout = document.getElementById("confirmCheckout");

  if (!checkoutBtn || !checkoutModal || !cancelCheckout || !confirmCheckout) return;

  checkoutBtn.addEventListener("click", () => {
    if (window.cart && window.cart.cart.length > 0) checkoutModal.style.display = "flex";
  });

  cancelCheckout.addEventListener("click", () => {
    checkoutModal.style.display = "none";
  });

  confirmCheckout.addEventListener("click", () => {
    if (window.cart) {
      localStorage.removeItem("cart");
      window.cart.cart = [];
      window.cart.updateCartUI();
      checkoutModal.style.display = "none";
      window.location.href = "checkout.html";
    }
  });
});
