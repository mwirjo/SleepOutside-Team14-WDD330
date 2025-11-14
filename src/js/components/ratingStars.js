export default class RatingStars {
  constructor(container, initial = 0, max = 5) {
    this.container = container;
    this.rating = Number(initial) || 0;
    this.max = max;
  }

  // render stars and make them clickable (optional)
  render() {
    if (!this.container) return;
    this.container.innerHTML = ""; // clear

    for (let i = 1; i <= this.max; i++) {
      const star = document.createElement("button"); // button is keyboard-accessible
      star.type = "button";
      star.className = "rating-star";
      star.dataset.value = i;
      star.setAttribute("aria-label", `Rate ${i} of ${this.max}`);
      star.innerText = i <= this.rating ? "★" : "☆";

      // click handler to change rating
      star.addEventListener("click", () => {
        this.setRating(i);
      });

      this.container.appendChild(star);
    }
  }

  setRating(value) {
    this.rating = value;
    this.render();
    // dispatch an event so page can listen if needed
    this.container.dispatchEvent(new CustomEvent("rating-change", {
      detail: { rating: this.rating },
      bubbles: true
    }));
  }
}
