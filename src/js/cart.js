import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs"; // Make sure setLocalStorage is defined properly

loadHeaderFooter();
// Render cart contents, showing items and total or empty message
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListElem = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElem = document.querySelector(".cart-total");

  if (cartItems.length === 0) {
    productListElem.innerHTML = `
      <li class="empty-cart-message">Your cart is currently empty.</li>
    `;
    cartFooter.style.visibility = "hidden";
    return 0;
  }

  // Render cart items
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  productListElem.innerHTML = htmlItems.join("");

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-item-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      removeItemFromCart(idx);
    });
  });

  // Calculate and show total
  const total = cartItems.reduce((accumulator, item) => accumulator + item.FinalPrice, 0);
  cartFooter.style.visibility = "visible";
  cartTotalElem.textContent = `Total: $${total.toFixed(2)}`;

  return total;
}
//** fied images */
function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img 
          src="${
            item.Images?.PrimaryExtraLarge ||
            item.Images?.PrimaryLarge ||
            item.Images?.PrimaryMedium ||
            item.Image ||
            "../images/fallback.jpg"
          }" 
          alt="${item.Name}" 
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item-btn" data-index="${index}" type="button">Remove</button>
    </li>
  `;
}



// Remove one item from cart by array index, save, and re-render
function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

// Empty the entire cart and re-render
function emptyCart() {
  setLocalStorage("so-cart", []);
  renderCartContents();
}

// Setup empty cart button listener
document.getElementById("empty-cart-btn").addEventListener("click", () => {
  emptyCart();
});

// Initial rendering of cart on page load
renderCartContents();
