import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key = "so-cart") {
    this.key = key;
    this.items = getLocalStorage(this.key) || [];
  }

  // Return all items
  getItems() {
    return this.items;
  }

  // Save changes
  save() {
    setLocalStorage(this.key, this.items);
  }

  // Remove item by index
  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
  }

  // Empty the entire cart
  empty() {
    this.items = [];
    this.save();
  }

  // Calculate total price
  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );
  }
}
