import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

import "./styles/index.css";
import closeButtonSrc from "./images/Close_Icon.png";

const closeButtonImages = document.querySelectorAll(".form__button-close-img");

closeButtonImages.forEach((image) => {
  image.src = closeButtonSrc;
});

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

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

// Inicializar UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

// Renderizamos las tarjetas iniciales
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards"
);

cardSection.renderer();

// Popup para imágenes
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// Popup para agregar nueva tarjeta
const placePopup = new PopupWithForm("#place-popup", (formData) => {
  const card = new Card(
    { name: formData.title, link: formData.url },
    "#card-template",
    handleCardClick
  );
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  placePopup.close();
});
placePopup.setEventListeners();

// Popup para editar perfil
const profilePopup = new PopupWithForm(
  "#profile-popup",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.aboutme,
    });
    profilePopup.close();
  },
  userInfo
);
profilePopup.setEventListeners();

// Validación de formularios
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
  profilePopup.getElement()
);
const placeFormValidator = new FormValidator(
  validationConfig,
  placePopup.getElement()
);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

// Eventos para abrir popups
editProfileButton.addEventListener("click", () => {
  profilePopup.open();
  profileFormValidator.resetValidation();
});

addPlaceButton.addEventListener("click", () => {
  placePopup.open();
  placeFormValidator.resetValidation();
});
