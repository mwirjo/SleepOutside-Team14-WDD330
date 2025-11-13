import { getLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // if not empty then calculate price and make the hidden div element visible
  if (htmlItems != []) {
    const total = cartItems.reduce((accumulator, object) => {
      return accumulator + object.FinalPrice;
    }, 0);
    
    document.querySelector(".cart-footer").style.visibility = "visible";
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
  } // NO SEPERATE FUNCTION ! ! TOO LATE
}

function cartItemTemplate(item) {
  // 🧹 Normalize any "../" and ensure 'public/' prefix
  let imagePath = item.Image.replace(/^(\.\.\/)+/, "");

  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="../public/${imagePath}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;

  return newItem;
}

renderCartContents();
