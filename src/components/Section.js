class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  generate() {
    this._element = document.querySelector(this._selector);
    this._items.forEach(item => {
      const itemElement = this._renderer(item);
      this._element.append(itemElement);
    });
    return this._element;
  }

  addItem(item) {
    const itemElement = this._renderer(item);
    this._element.prepend(itemElement);
  }
}
