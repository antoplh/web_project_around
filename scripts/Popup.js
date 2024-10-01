export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    // abre el popup
    if (!this._popupElement.classList.contains("popup_opened")) {
      this._popupElement.classList.add("popup_opened");
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
      if (evt.target.classList.contain("popup")) {
        this.close();
      }
    });
    const closePopupButton = document.querySelector(`${this._popupSelector} .form__button-close`)
    closePopupButton.addEventListener("click", () => {this.close()});
  }
}
