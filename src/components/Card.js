export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; // Para usar PopupWithImage
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

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => this._handleHeartCard());

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._link, this._name)
      );
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
}
