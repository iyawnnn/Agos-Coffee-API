// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Format currency
function formatPeso(n) {
  return `₱${Number(n).toFixed(0)}`;
}

// Update cart counter
function updateCartCount() {
  const cartCountDesktop = document.getElementById("cart-count");
  const cartCountMobile = document.getElementById("cart-count-mobile");
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (cartCountDesktop) {
    cartCountDesktop.textContent = totalCount > 0 ? totalCount : "";
    cartCountDesktop.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
  if (cartCountMobile) {
    cartCountMobile.textContent = totalCount > 0 ? totalCount : "";
    cartCountMobile.style.display = totalCount > 0 ? "inline-flex" : "none";
  }
}

// Render cart panel / UI
function updateCartUI() {
  const cartBody = document.getElementById("cartBody");
  const cartTotalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartBody || !cartTotalEl) return;
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-illustration">
        <img src="assets/icons/CART-PANEL.svg" alt="Empty Cart" class="empty-cart-img" />
        <h4>Hungry?</h4>
        <p>You haven't added anything to your cart!</p>
      </div>`;
    cartTotalEl.innerText = formatPeso(0);
    updateCartCount();
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.remove("enabled");
    }
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">${formatPeso(item.price)}</div>
        <div class="qty-controls">
          <button class="qty-btn decrease" data-name="${item.name}">
            ${item.qty === 1 ? `<img src="assets/icons/TRASH-ICON.svg" width="14" height="14">` : `<span class="minus-sign">-</span>`}
          </button>
          <div class="qty-count">${item.qty}</div>
          <button class="qty-btn increase" data-name="${item.name}"><span class="plus-sign">+</span></button>
        </div>
      </div>`;
    cartBody.appendChild(itemEl);
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalEl.innerText = formatPeso(total);

  updateCartCount();

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.add("enabled");
  }

  // Attach event listeners for qty buttons
  cartBody.querySelectorAll(".increase").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.name, 1)));
  cartBody.querySelectorAll(".decrease").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.name, -1)));
}

// Change quantity helper
function changeQty(name, delta) {
  const idx = cart.findIndex(i => i.name === name);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Add item to cart
function addToCart(name, price, img) {
  const found = cart.find(i => i.name === name);
  if (found) {
    found.qty++;
  } else {
    cart.push({ name, price: Number(price), img, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Initialize cart UI on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});

// Expose globally for other scripts
window.cart = {
  addToCart,
  updateCartUI,
  changeQty,
  cart
};
