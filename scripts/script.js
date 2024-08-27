const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileFormButton = document.querySelector(
  "#profile-form .form__button-close"
);
const profileFormElement = document.querySelector("#profile-form");
const addPlaceButton = document.querySelector(".profile__add-button");
const closePlaceFormButton = document.querySelector(
  "#place-form .form__button-close"
);
const closeImagePopup = document.querySelector(
  "#image-popup .form__button-close"
);
const placeFormElement = document.querySelector("#place-form");
const cardsContainer = document.querySelector(".cards");
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
const popupElements = Array.from(document.querySelectorAll(".popup"));
// validation variable
import { enableValidation } from "./validate.js";
const validationConfig = {
  errorClass: "form__input-error_active",
  inputErrorClass: "form__input_type_error",
  activeButtonClass: "form__button-save_active",
  formSelector: ".form",
  submitButtonSelector: ".form__button-save",
  inputSelector: ".form__input",
};

enableValidation(validationConfig);

function createCard(name, link) {
  const cardElementTemplate = document.querySelector("#card-template").content;
  const cardElement = cardElementTemplate
    .querySelector(".card")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  const cardHeartButton = cardElement.querySelector(".card__heart");
  cardHeartButton.addEventListener("click", function () {
    cardHeartButton.classList.toggle("card__heart_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete");
  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButton.closest(".card").remove();
  });

  const cardImageSrc = cardElement.querySelector(".card__image");
  cardImageSrc.addEventListener("click", function () {
    openImagePopup(name, link);
  });
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  cardsContainer.append(cardElement);
});

function openImagePopup(name, link) {
  const popup = document.querySelector("#image-popup");
  popup.querySelector(".popup__image-src").src = link;
  popup.querySelector(".popup__image-title").textContent = name;
  popup.classList.add("popup_opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = profileFormElement.querySelector('input[name="name"]');
  let jobInput = profileFormElement.querySelector('input[name="aboutme"]');

  console.log(nameInput.value, jobInput.value);
  let name = nameInput.value;
  let job = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileDesc = document.querySelector(".profile__description");

  profileName.textContent = name;
  profileDesc.textContent = job;

  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

function handleProfileFormOpen(evt) {
  evt.preventDefault();
  let popup = document.querySelector("#profile-popup");
  let profileName = document.querySelector(".profile__name");
  let profileDesc = document.querySelector(".profile__description");
  let nameInput = profileFormElement.querySelector('input[name="name"]');
  let jobInput = profileFormElement.querySelector('input[name="aboutme"]');
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
  }
  const formElement = evt.target.querySelector(validationConfig.formSelector);
  enableValidation(validationConfig);
}

function handleProfileFormClose(evt) {
  evt.preventDefault();
  let popup = document.querySelector("#profile-popup");
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  }
}

function handlePlaceFormOpen(evt) {
  evt.preventDefault();

  let popup = document.querySelector("#place-popup");
  placeFormElement.reset();
  enableValidation(validationConfig);

  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
  }
}

function handlePlaceFormClose(evt) {
  evt.preventDefault();
  let popup = document.querySelector("#place-popup");
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  }
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = placeFormElement.querySelector('input[name="title"]');
  const URLInput = placeFormElement.querySelector('input[name="url"]');

  const title = titleInput.value;
  const URL = URLInput.value;

  const newCard = createCard(title, URL);
  cardsContainer.prepend(newCard);

  const popup = document.querySelector("#place-popup");
  popup.classList.remove("popup_opened");
}

// Handle Edit Profile Popup and Form
editProfileButton.addEventListener("click", handleProfileFormOpen);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
closeProfileFormButton.addEventListener("click", handleProfileFormClose);

// Handle Add Place Popup and Form
addPlaceButton.addEventListener("click", handlePlaceFormOpen);
placeFormElement.addEventListener("submit", handlePlaceFormSubmit);
closePlaceFormButton.addEventListener("click", handlePlaceFormClose);

// Handle Image Popup
closeImagePopup.addEventListener("click", function (evt) {
  evt.preventDefault();
  let popup = document.querySelector("#image-popup");
  popup.classList.remove("popup_opened");
});

// Close all Popups with Escape Key
document.addEventListener("keydown", (evt) => {
  if (evt.key == "Escape") {
    handleProfileFormClose(evt);
    handlePlaceFormClose(evt);
    let popup = document.querySelector("#image-popup");
    popup.classList.remove("popup_opened");
  }
});
// Close Popup when pressing the .popup class
popupElements.forEach((popupElement) => {
  popupElement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      console.log(evt.target.classList.contains("popup"));
      handleProfileFormClose(evt);
      handlePlaceFormClose(evt);
      let popup = document.querySelector("#image-popup");
      popup.classList.remove("popup_opened");
    }
  });
});
