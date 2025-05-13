import "./index.css";
import {
  initialCards,
  selectors,
  validationSettings,
  getDOMElements,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

//
let editFormValidator;
let addFormValidator;
let dom;

document.addEventListener("DOMContentLoaded", () => {
  //
  dom = getDOMElements();

  //
  const userInfo = new UserInfo({
    nameSelector: "#profile-title",
    jobSelector: "#profile-description",
  });

  //
  editFormValidator = new FormValidator(
    validationSettings,
    dom.profileEditForm
  );
  editFormValidator.enableValidation();

  addFormValidator = new FormValidator(validationSettings, dom.cardAddForm);
  addFormValidator.enableValidation();

  //
  const cardSection = new Section(
    {
      items: initialCards,
      renderer: renderCard,
    },
    selectors.cardSection
  );
  cardSection.renderItems();

  //
  function renderCard(item) {
    const card = new Card(item, selectors.cardTemplate, handleImageClick);
    const cardEl = card.getView();
    cardSection.addItem(cardEl);
  }

  //
  const cardAddPopupWithForm = new PopupWithForm(
    "#add-card-modal",
    (values) => {
      renderCard({
        name: values.title,
        link: values.url,
      });
      dom.cardAddForm.reset();
      addFormValidator.disableSubmitButton();
      cardAddPopupWithForm.close();
    }
  );
  cardAddPopupWithForm.setEventListeners();

  //
  const profileEditSubmitPopupWithForm = new PopupWithForm(
    "#profile-edit-modal",
    (values) => {
      console.log("SUBMITTED VALUES:", values);
      userInfo.setUserInfo(values);
      profileEditSubmitPopupWithForm.close();
    }
  );
  profileEditSubmitPopupWithForm.setEventListeners();

  //
  const imagePopup = new PopupWithImage("#popup-preview-modal");
  imagePopup.setEventListeners();

  //
  dom.profileEditButton.addEventListener("click", () => {
    editFormValidator.resetValidation();
    profileEditSubmitPopupWithForm.setInputValues(userInfo.getUserInfo());
    profileEditSubmitPopupWithForm.open();
  });

  dom.cardAddButton.addEventListener("click", () => {
    addFormValidator.resetValidation();
    cardAddPopupWithForm.open();
  });

  function handleImageClick(cardData) {
    imagePopup.open(cardData);
  }
});
