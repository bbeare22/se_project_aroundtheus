export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
      return;
    }
    this._enableSubmitButton();
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (_evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls);
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
