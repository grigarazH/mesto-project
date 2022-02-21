// Класс карточки. Конструктор принимает объект карточки, селектор шаблона, обработчики событий нажатия на карточку, нажатия на кнопку лайка, нажатия на кнопку
// удаления, булевые параметры, отвечающие за то, лайкнута ли карточка и нужно ли отображать кнопку удаления.
export default class Card {
  constructor(card, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, isLiked, showDelete) {
    this._element = this._getElement();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeAmount = this._element.querySelector(".card__like-amount");
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isLiked = isLiked;
    this._showDelete = showDelete;

  }

  // Возвращает элемент карточки, сгенерированный из шаблона
  _getElement() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  likeCard(card) {
    this._likeAmount.textContent = card.likes.length;
    this._likeButton.classList.add("card__like-button_active");
  }

  dislikeCard(card) {
    this._likeAmount.textContent = card.likes.length;
    this._likeButton.classList.remove("card__like-button_active");
  }

  // Добавляет обработчиков события карточке
  _setEventListeners() {
    this._element.querySelector(".card__image-container").addEventListener('click', () => this._handleCardClick());
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
  }

  // Наполняет элемент карточки данными и возвращает полностью готовый элемент карточки
  generate() {
    if (this._showDelete) {
      this._deleteButton.classList.remove("card__delete-button_hidden");
    } else {
      this._deleteButton.classList.add("card__delete-button_hidden");
    }
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
    this._element.querySelector('.card__title').textContent = this._card.name;
    this._element.querySelector('.card__image').src = this._card.link;
    this._element.querySelector('.card__image').alt = this._card.name;
    this._likeAmount.textContent = this._card.likes.length;
    this._setEventListeners();
    return this._element;
  }
}
