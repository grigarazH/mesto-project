// Класс карточки. Конструктор принимает объект карточки, селектор шаблона, обработчики событий нажатия на карточку, нажатия на кнопку лайка, нажатия на кнопку
// удаления, булевые параметры, отвечающие за то, лайкнута ли карточка и нужно ли отображать кнопку удаления.
export default class Card {
  constructor(card, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, isLiked, showDelete) {
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

  // Добавляет обработчиков события карточке
  _setEventListeners() {
    this._element.querySelector(".card__image-container").addEventListener('click', () => this._handleCardClick());
    const likeButton = this._element.querySelector('.card__like-button');
    const deleteButton = this._element.querySelector('.card__delete-button');
    const likeAmount = this._element.querySelector('.card__like-amount');
    likeButton.addEventListener('click', () => this._handleLikeClick(likeButton, likeAmount));
    deleteButton.addEventListener('click', () => this._handleDeleteClick());
  }

  // Наполняет элемент карточки данными и возвращает полностью готовый элемент карточки
  generate() {
    this._element = this._getElement();
    const deleteButton = this._element.querySelector('.card__delete-button');
    if (this._showDelete) {
      deleteButton.classList.remove("card__delete-button_hidden");
    } else {
      deleteButton.classList.add("card__delete-button_hidden");
    }
    const likeButton = this._element.querySelector(".card__like-button");
    if(this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    }else {
      likeButton.classList.remove("card__like-button_active");
    }
    this._element.querySelector('.card__title').textContent = this._card.name;
    this._element.querySelector('.card__image').src = this._card.link;
    this._element.querySelector('.card__image').alt = this._card.name;
    this._element.querySelector('.card__like-amount').textContent = this._card.likes.length;
    this._setEventListeners();
    return this._element;
  }
}
