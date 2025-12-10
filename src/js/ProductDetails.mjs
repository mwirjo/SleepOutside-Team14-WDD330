import { getLocalStorage, setLocalStorage,alertMessage } from "./utils.mjs";



export default class ProductDetails {
    constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
         
        this.renderProductDetails();
        document
        .getElementById("add-to-cart")
        .addEventListener("click", this.addProductToCart.bind(this));
        
    }

    addProductToCart() {
      const cartItems = getLocalStorage("so-cart") || [];
      // Check if product already exists in cart by id (and optionally color/size)
      const uniqueKey = `${this.product.id}-${this.product.Colors?.[0]?.ColorName || "default"}`;

      const existingItem = cartItems.find(
        (item) => item.uniqueKey === uniqueKey
      );

  if (existingItem) {
    existingItem.quantity += 1; // increment quantity
    alertMessage(`Added another ${this.product.NameWithoutBrand} to your cart!`);
  } else {
    cartItems.push({ ...this.product, quantity: 1, uniqueKey }); // add uniqueKey
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

      setLocalStorage("so-cart", cartItems);
      this.animateCart();
  
    }

    // does not work on repeat clicks unless you reload the page :(
    animateCart() {
      const cartLogo = document.querySelector("#cart-logo");
      cartLogo.style.animation = "0.6s linear 0s 1 cartbling";
    }
    
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

    
  
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  document.querySelector("#p-price").textContent = `${product.FinalPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}