// Класс модального окна. Конструктор принимает селектор модального окна
export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._escCloseListener = this._handleEscClose.bind(this);
    this._popup = document.querySelector(this._selector);
  }

  // Открывает модальное окно и добавляет обработчик событий для закрытия по escape
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escCloseListener);
  }

  // Закрывает модальное окно и удаляет обработчик событий для закрытия по escape
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escCloseListener);
  }

  // Обработчик события для закрытия по escape
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Подключает обработчики событий модального окна
  setEventListeners() {
    this._popup.addEventListener("mousedown", e => {
      if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    })
  }
}
