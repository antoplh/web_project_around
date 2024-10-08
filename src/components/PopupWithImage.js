import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open(imageSrc, imageAlt) {
    const imageElement = this._popupElement.querySelector(".popup__image");
    const captionElement = this._popupElement.querySelector(".popup__caption");
    imageElement.src = imageSrc;
    imageElement.alt = imageAlt;
    captionElement.textContent = imageAlt;
    super.open();
  }
}
