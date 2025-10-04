document.addEventListener("DOMContentLoaded", () => {
  // ---------- Newsletter modal ----------
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

  // ---------- Cart count on page load ----------
  const cartCountDesktop = document.getElementById("cart-count");
  const cartCountMobile = document.getElementById("cart-count-mobile");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cartCountDesktop) {
    cartCountDesktop.textContent = totalCount > 0 ? totalCount : "";
    cartCountDesktop.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
  if (cartCountMobile) {
    cartCountMobile.textContent = totalCount > 0 ? totalCount : "";
    cartCountMobile.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
});
