import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(this._form.querySelectorAll(".modal__input"));
    this._submitButton = this._form.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      const value = data[input.name];
      if (typeof value === "string") {
        input.value = value.trim();
      } else {
        input.value = "";
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._defaultButtonText;
  }
}
