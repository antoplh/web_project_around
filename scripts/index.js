import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import * as utils from "./utils.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const cardsContainer = document.querySelector(".cards");

initialCards.forEach((card) => {
  const cardInstance = new Card(card, "#card-template");
  const cardElement = cardInstance.generateCard();
  cardsContainer.append(cardElement);
});

function handlePopupEventListeners() {
  // Handle Edit Profile Popup and Form
  utils.editProfileButton.addEventListener("click", (evt) => {
    utils.handleProfileFormOpen(evt);
    profileFormValidator.resetValidation();
  });
  utils.closeProfileFormButton.addEventListener(
    "click",
    utils.handlePopupClose
  );

  // Handle Add Place Popup and Form
  utils.addPlaceButton.addEventListener("click", (evt) => {
    utils.handlePlaceFormOpen(evt);
    placeFormValidator.resetValidation();
  });
  utils.closePlaceFormButton.addEventListener("click", utils.handlePopupClose);

  // Handle Close Image Popup
  utils.closeImagePopup.addEventListener("click", utils.handlePopupClose);

  // Close all Popups with Escape Key
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      utils.handlePopupClose(evt);
    }
  });
  // Close Popup when pressing the .popup class
  utils.popupElements.forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        utils.handlePopupClose(evt);
      }
    });
  });
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = utils.placeFormElement.querySelector(
    'input[name="title"]'
  );
  const URLInput = utils.placeFormElement.querySelector('input[name="url"]');

  const title = titleInput.value;
  const URL = URLInput.value;

  const newCard = new Card({ name: title, link: URL }, "#card-template");
  const newCardElement = newCard.generateCard();
  cardsContainer.prepend(newCardElement);

  const popup = document.querySelector("#place-popup");
  popup.classList.remove("popup_opened");
  utils.placeFormElement.reset();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = utils.profileFormElement.querySelector('input[name="name"]');
  let jobInput = utils.profileFormElement.querySelector(
    'input[name="aboutme"]'
  );

  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileDesc = document.querySelector(".profile__description");

  profileName.textContent = name;
  profileDesc.textContent = job;

  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

utils.profileFormElement.addEventListener("submit", handleProfileFormSubmit);
utils.placeFormElement.addEventListener("submit", handlePlaceFormSubmit);

const validationConfig = {
  errorClass: "form__input-error_active",
  inputErrorClass: "form__input_type_error",
  activeButtonClass: "form__button-save_active",
  formSelector: ".form",
  submitButtonSelector: ".form__button-save",
  inputSelector: ".form__input",
};

const profileFormValidator = new FormValidator(
  validationConfig,
  utils.profileFormElement
);
profileFormValidator.enableValidation();
const placeFormValidator = new FormValidator(
  validationConfig,
  utils.placeFormElement
);
placeFormValidator.enableValidation();
handlePopupEventListeners();
