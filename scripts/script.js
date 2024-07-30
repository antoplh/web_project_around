let editProfileButton = document.querySelector(".profile__edit-button");
let closeFormButton = document.querySelector(".form__button-close");
let formElement = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
  // Esta línea impide que el navegador
  // entregue el formulario en su forma predeterminada.
  evt.preventDefault();
  // Una vez hecho esto, podemos definir nuestra propia forma de entregar el formulario.
  // Lo explicaremos todo con más detalle después.

  // Busquemos los campos del formulario en el DOM
  let nameInput = formElement.querySelector('input[name="name"]');
  let jobInput = formElement.querySelector('input[name="aboutme"]');
  console.log(nameInput.value, jobInput.value);
  // Obtén los valores de cada campo desde la propiedad de valor correspondiente
  let name = nameInput.value;
  let job = jobInput.value;

  // Selecciona los elementos donde se introducirán los valores de los campos
  let profileName = document.querySelector(".profile__name");
  let profileDesc = document.querySelector(".profile__description");
  // Inserta nuevos valores utilizando el textContent
  profileName.textContent = name;
  profileDesc.textContent = job;
  // cerrar formulario
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}

function handleFormOpen(evt) {
  evt.preventDefault();
  let popup = document.querySelector(".popup");
  let profileName = document.querySelector(".profile__name");
  let profileDesc = document.querySelector(".profile__description");
  let nameInput = formElement.querySelector('input[name="name"]');
  let jobInput = formElement.querySelector('input[name="aboutme"]');
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
  }
}

function handleFormClose(evt) {
  evt.preventDefault();
  let popup = document.querySelector(".popup");
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editProfileButton.addEventListener("click", handleFormOpen);
closeFormButton.addEventListener("click", handleFormClose);
