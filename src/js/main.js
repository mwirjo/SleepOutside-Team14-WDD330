import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element); // kill me


productList.init();
