export default class Card {
  constructor(
    { name, link, _id, isLiked = false },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;

    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");
  }

  getId() {
    return this._id;
  }

  getView() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._updateLikesView();
    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return template.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this, this._id)
    );
    this._image.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikes({ isLiked }) {
    this._isLiked = isLiked;
    this._updateLikesView();
  }

  _updateLikesView() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
