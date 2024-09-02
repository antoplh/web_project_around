export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const closeProfileFormButton = document.querySelector(
  "#profile-form .form__button-close"
);
export const profileFormElement = document.querySelector("#profile-form");
export const addPlaceButton = document.querySelector(".profile__add-button");
export const closePlaceFormButton = document.querySelector(
  "#place-form .form__button-close"
);
export const closeImagePopup = document.querySelector(
  "#image-popup .form__button-close"
);
export const placeFormElement = document.querySelector("#place-form");
export const popupElements = Array.from(document.querySelectorAll(".popup"));

export function handlePopupOpen(popup) {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
  }
}

export function handleProfileFormOpen(evt) {
  evt.preventDefault();
  const popup = document.querySelector("#profile-popup");
  const profileName = document.querySelector(".profile__name");
  const profileDesc = document.querySelector(".profile__description");
  const nameInput = profileFormElement.querySelector('input[name="name"]');
  const jobInput = profileFormElement.querySelector('input[name="aboutme"]');

  handlePopupOpen(popup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

export function handlePlaceFormOpen(evt) {
  evt.preventDefault();
  const popup = document.querySelector("#place-popup");
  placeFormElement.reset();

  handlePopupOpen(popup);
}

export function handlePopupClose(evt) {
  evt.preventDefault();
  const popup = document.querySelector(".popup_opened");
  if (popup) {
    popup.classList.remove("popup_opened");
  }
}
