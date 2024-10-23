export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    handleHeartUpdate,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._numLikes = data.likes ? data.likes.length : "";
    this._cardId = data._id;
    this._userId = userId; // saber el usuario actual
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; // Para usar PopupWithImage
    this._handleCardDelete = handleCardDelete; // Para usar PopupConfirm
    this._handleHeartUpdate = handleHeartUpdate; // Para actualizar el like
    this._isliked = data.likes.some((like) => like._id === this._userId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  updateNumHearts(numLikes) {
    // actualiza el numero de likes en una tarjeta
    this._numLikes = numLikes !== undefined ? numLikes : this._numLikes;

    const heart = this._element.querySelector(".card__heart");
    if (this._numLikes === 0) {
      heart.setAttribute("data-likes", "");
    } else {
      heart.setAttribute("data-likes", this._numLikes);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;

    if (this._userId !== this._ownerId) {
      this._element.querySelector(".card__delete").style.display = "none";
    }
    if (this._isliked) {
      this._element
        .querySelector(".card__heart")
        .classList.add("card__heart_active");
    }
    this.updateNumHearts();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", () => this._handleHeartCard());

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () =>
        this._handleCardDelete(this._cardId, this)
      );

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._link, this._name)
      );
  }

  removeCard() {
    // Elimina la tarjeta visualmente
    this._element.remove();
    this._element = null;
  }

  _handleHeartCard() {
    this._element
      .querySelector(".card__heart")
      .classList.toggle("card__heart_active");
    this._isliked = !this._isliked;
    this._handleHeartUpdate(this._cardId, !this._isliked, this); // estado del like contrario para que tome su estado anterior
  }
}
