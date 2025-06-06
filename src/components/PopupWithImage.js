import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector("#image-modal-image");
    this._caption = this._popupElement.querySelector("#modal-caption");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name ? `Photo of ${name}` : "Photo preview";
    this._caption.textContent = name || "";
    super.open();
  }
}
