export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    console.log(this._element);
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => {
        this._handleHeartCard();
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }
  _handleOpenPopup() {
    const popup = document.querySelector("#image-popup");
    popup.querySelector(".popup__image-src").src = this._link;
    popup.querySelector(".popup__image-title").textContent = this._name;
    popup.classList.add("popup_opened");
  }
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  _handleHeartCard() {
    this._element
      .querySelector(".card__heart")
      .classList.toggle("card__heart_active");
  }
  _handlePreviewPopup() {
    // handle preview popup
    openImagePopup(this._name, this._link);
  }
}
