import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, submitButtonSelector = ".modal__button" }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector("form");
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._originalButtonText = this._submitButton.textContent;
    this._handleSubmit = null;
  }

  setSubmitAction(callback) {
    this._handleSubmit = callback;
  }

  renderSaving(isSaving) {
    this._submitButton.textContent = isSaving
      ? "Deleting..."
      : this._originalButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
