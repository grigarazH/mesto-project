// Класс секции, содержащей генерируемые кодом элементы. Конструктор принимает объект с рендер-функцией и селектор секции.
export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._selector = selector;
  }

  // Осуществляет генерацию нескольких элементов с помощью рендер-функции и добавление их в верстку
  renderItems(items) {
    this._element = document.querySelector(this._selector);
    items.forEach(item => {
      const itemElement = this._renderer(item);
      this._element.append(itemElement);
    });
  }

  // Осуществляет генерацию одного элемента с помощью рендер-функции и добавления его в верстку
  addItem(item) {
    const itemElement = this._renderer(item);
    this._element = document.querySelector(this._selector);
    this._element.prepend(itemElement);
  }

  // Осуществляет удаление элемента по индексу и селектору из секции
  delete(index, selector) {
    this._element = document.querySelector(this._selector);
    const elements = this._element.querySelectorAll(selector);
    elements[index].remove();
  }
}
