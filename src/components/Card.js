export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;

    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._trashBtnEl = this._cardElement.querySelector(".card__delete-button");
    this._likeBtnEl = this._cardElement.querySelector(".card__like-button");
  }

  getView() {
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._likeBtnEl.addEventListener("click", () => this._toggleLike());
    this._trashBtnEl.addEventListener("click", () => this._deleteCard());
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _toggleLike() {
    this._likeBtnEl.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
