let cards, deleteCardId;

// Получение id удаляемой карточки
export const getDeleteCardId = () => deleteCardId;

// Запись id удаляемой карточки
export const setDeleteCardId = id => deleteCardId = id;

// Получение локальной информации о карточках
export const getCards = () => cards;

// Запись локальной информации о карточках
export const setCards = fetchedCards => {
  cards = fetchedCards
};
