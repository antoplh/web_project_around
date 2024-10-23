import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";

import "./styles/index.css";
import closeButtonSrc from "./images/Close_Icon.png";

// API Calls
const apiOptions = {
  baseUrl: "https://around.nomoreparties.co/v1/web-es-cohort-16",
  headers: {
    authorization: "3affd1de-5700-4699-bd1e-708179068d5e",
  },
};

const api = new Api(apiOptions);

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");

let cardSection;
let userId;
let cardIdDelete = null; // variable para guardar el id de la tarjeta que sera eliminada por el usuario
let cardInstDelete = null;

// Inicializar UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  imageSelector: ".profile__avatar",
});

// Datos del Perfil
api
  .get("users/me")
  .then((res) => {
    console.log(res);
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
      userId: res._id,
    });
    userId = res._id;
    userInfo.setUserAvatar({
      image: res.avatar,
    });
  })
  .catch((error) => console.log(error));

// Cargar las cartas del API
api
  .get("cards")
  .then((res) => {
    console.log(res);
    cardSection = new Section(
      {
        items: res,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            handleCardClick,
            handleCardDelete,
            handleHeartUpdate,
            userId
          );
          const cardElement = card.generateCard();
          cardSection.addItem(cardElement);
        },
      },
      ".cards"
    );
    // Renderizamos las tarjetas iniciales
    cardSection.renderer();
  })
  .catch((error) => console.log(`Error al cargar las tarjetas: ${error}`));

const closeButtonImages = document.querySelectorAll(".form__button-close-img");

closeButtonImages.forEach((image) => {
  image.src = closeButtonSrc;
});

// Popup para imágenes
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Popup para confirmar
const confirmPopup = new PopupWithForm("#confirm-popup", () => {
  api
    .delete(`cards/${cardIdDelete}`)
    .then(() => {
      cardInstDelete.removeCard();
      confirmPopup.close();
      console.log("tarjeta eliminada con id ", cardIdDelete);
    })
    .catch((error) => console.log(`Error al eliminar la tarjeta: ${error}`))
    .finally(() => {
      cardInstDelete = null;
      cardIdDelete = null;
    });
});
confirmPopup.setEventListeners();

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}
function handleCardDelete(cardId, cardInstance) {
  confirmPopup.open();
  cardIdDelete = cardId;
  cardInstDelete = cardInstance;
  console.log("se esta seteando la siguiente carta a eliminar", cardId);
  console.log(cardInstance);
}
function handleHeartUpdate(cardId, isLiked, cardInstance) {
  if (!isLiked) {
    api
      .put(`cards/likes/${cardId}`)
      .then((res) => {
        const numLikes = res.likes.length;
        cardInstance.updateNumHearts(numLikes);
      })
      .catch((error) => console.log(error));
  } else {
    api.delete(`cards/likes/${cardId}`).then((res) => {
      const numLikes = res.likes.length;
      console.log("delete ", res, numLikes);
      cardInstance.updateNumHearts(numLikes);
    });
  }
}
// Popup para cambiar foto de perfil
const avatarPopup = new PopupWithForm("#profilepic-popup", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .patch("users/me/avatar", {
      avatar: formData.profilepic,
    })
    .then((res) => {
      userInfo.setUserAvatar({
        image: res.avatar,
      });
      console.log(res);
      avatarPopup.renderLoading(false);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
      avatarPopup.close();
    });
});
avatarPopup.setEventListeners();

// Popup para agregar nueva tarjeta
const placePopup = new PopupWithForm("#place-popup", (formData) => {
  const newTitle = formData.title;
  const newImage = formData.url;
  placePopup.renderLoading(true);
  api
    .post("cards", {
      name: newTitle,
      link: newImage,
    })
    .then((res) => {
      console.log(res);
      const card = new Card(
        res,
        "#card-template",
        handleCardClick,
        handleCardDelete,
        handleHeartUpdate,
        userId
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
      placePopup.renderLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      placePopup.renderLoading(false);
      placePopup.close();
    });
});
placePopup.setEventListeners();

// Popup para editar perfil
const profilePopup = new PopupWithForm(
  "#profile-popup",
  (formData) => {
    profilePopup.renderLoading(true);
    const newName = formData.name;
    const newJob = formData.aboutme;

    // Editar Perfil (Actualizacion en el API)
    api
      .patch("users/me", { name: newName, about: newJob })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
        });
        profilePopup.renderLoading(false);
        console.log("Información del perfil actualizada:", res);
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
        profilePopup.close();
      });
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
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarPopup.getElement()
);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Eventos para abrir popups
editProfileButton.addEventListener("click", () => {
  profilePopup.open();
  profileFormValidator.resetValidation();
});

addPlaceButton.addEventListener("click", () => {
  placePopup.open();
  placeFormValidator.resetValidation();
});

editAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
});
