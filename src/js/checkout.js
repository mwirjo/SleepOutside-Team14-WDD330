import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".order-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();
});

// this is how it would look if we listen for the submit on the form
// document.forms['checkout']
// .addEventListener('submit', (e) => {
//   e.preventDefault();
//   // e.target would contain our form in this case
//    myCheckout.checkout();
// });