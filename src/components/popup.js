export const photoPopup = document.querySelector(".popup_type_photo");
export const photoPopupImage = photoPopup.querySelector(".popup__photo");
export const photoPopupCaption = photoPopup.querySelector(".popup__photo-caption");
export const openPopup = popup => {
  popup.classList.add("popup_opened");
  setTimeout(() => popup.focus(), 400);
}
export const closePopup = popup => popup.classList.remove("popup_opened");

export const openPhotoPopup = card => {
  photoPopupImage.src = card.link;
  photoPopupImage.alt = card.name;
  photoPopupCaption.textContent = card.name;
  openPopup(photoPopup);
}
