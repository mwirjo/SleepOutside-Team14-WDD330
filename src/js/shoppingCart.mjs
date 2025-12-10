import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key = "so-cart") {
  this.key = key;
  this.items = getLocalStorage(this.key) || [];
  // Ensure every item has quantity
  this.items.forEach(item => {
    if (!item.quantity) item.quantity = 1;
  });
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
      (total, item) => total + item.FinalPrice * item.quantity,
      0
    );

  }
    // Update quantity of an item
  updateQuantity(index, newQty) {
    const qty = Math.max(1, parseInt(newQty, 10));
    this.items[index].quantity = qty;
    this.save();
  }

}
