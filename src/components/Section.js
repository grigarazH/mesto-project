class Section {
  constructor({renderer,}, selector) {
    this._renderer = renderer;
    this._selector = selector;
  }

  renderItems(items) {
    this._element = document.querySelector(this._selector);
    items.forEach(item => {
      const itemElement = this._renderer(item);
      this._element.append(itemElement);
    });
  }

  addItem(item) {
    const itemElement = this._renderer(item);
    this._element = document.querySelector(this._selector);
    this._element.prepend(itemElement);
  }
}
