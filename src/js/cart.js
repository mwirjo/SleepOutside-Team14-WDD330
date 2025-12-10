import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart");

function renderCart() {
  const productListElem = document.querySelector(".cart-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElem = document.querySelector(".cart-total");

  const items = cart.getItems();

  // If empty cart
  if (items.length === 0) {
    productListElem.innerHTML = `
      <li class="empty-cart-message">Your cart is currently empty.</li>
    `;
    cartFooter.style.visibility = "hidden";
    return;
  }

  // Render items
  productListElem.innerHTML = items
    .map((item, index) => cartItemTemplate(item, index))
    .join("");

  // Add remove button events
  document.querySelectorAll(".remove-item-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      cart.removeItem(idx);       // Remove from ShoppingCart
      renderCart();               // Re-render UI
    });
  });
  // Quantity change event
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      const newQty = e.target.value;

      cart.updateQuantity(idx, newQty);
      renderCart(); // Re-render to update totals
    });
  });

  // Show total
  cartFooter.style.visibility = "visible";
  cartTotalElem.textContent = `Total: $${cart.getTotal().toFixed(2)}`;
}

// Template for each cart item
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
      <div class="cart-card__quantity">
        <label>Qty:</label>
        <input type="number" 
              class="qty-input" 
              data-index="${index}" 
              min="1" 
              value="${item.quantity}">
        <p class="cart-card__price">Unit Price: $${item.FinalPrice.toFixed(2)}</p>
        <p class="cart-card__line-total">Total: $${(item.FinalPrice * item.quantity).toFixed(2)}
      </div>
      </p>
      <button class="remove-item-btn" data-index="${index}">Remove</button>
      
    </li>
  `;
}

// Empty cart button
document.getElementById("empty-cart-btn").addEventListener("click", () => {
  cart.empty();
  
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "/checkout/index.html";
});


// Initial render
renderCart();
