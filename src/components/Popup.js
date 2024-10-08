export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector(
      ".form__button-close"
    );
  }
  open() {
    // abre el popup
    if (!this._popupElement.classList.contains("popup_opened")) {
      this._popupElement.classList.add("popup_opened");
      this._handleEscClose();
    }
  }
  close() {
    // cierra el popup
    this._popupElement.classList.remove("popup_opened");
  }
  _handleEscClose() {
    // almacena logica para cerrar el popup al pulsar esc
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }
  setEventListeners() {
    // agrega un detector de eventos de click al icono de
    // cerrar el popup. Tambien la ventana debe cerrarse
    // cuando el usuario hace clic en el area fuera del formulario
    this._handleEscClose();
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
    this._closePopupButton.addEventListener("click", () => {
      this.close();
    });
  }
  getElement() {
    return this._popupElement;
  }
}
