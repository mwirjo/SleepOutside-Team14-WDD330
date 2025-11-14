import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element); // kill me



productList.init();



import RatingStars from "./components/ratingStars.js";

document.addEventListener("DOMContentLoaded", () => {
  const ratingContainer = document.getElementById("product-rating");

  if (ratingContainer) {
    const ratingStars = new RatingStars(ratingContainer, 4); 
    ratingStars.render();
  }
});
