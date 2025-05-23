import "./index.css";
import {
  selectors,
  validationSettings,
  getDOMElements,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

let editFormValidator;
let addFormValidator;
let avatarFormValidator;
let dom;
let cardSection;
let userId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "806a2baa-081d-4321-b473-e51300bcf632",
    "Content-Type": "application/json",
  },
});

document.addEventListener("DOMContentLoaded", () => {
  dom = getDOMElements();

  const userInfo = new UserInfo({
    nameSelector: "#profile-title",
    jobSelector: "#profile-description",
    avatarSelector: ".profile__image",
  });

  // Validators
  editFormValidator = new FormValidator(
    validationSettings,
    dom.profileEditForm
  );
  editFormValidator.enableValidation();

  addFormValidator = new FormValidator(validationSettings, dom.cardAddForm);
  addFormValidator.enableValidation();

  avatarFormValidator = new FormValidator(
    validationSettings,
    dom.avatarEditForm
  );
  avatarFormValidator.enableValidation();

  // Confirm Delete Modal
  const confirmDeletePopup = new PopupWithConfirm({
    popupSelector: "#confirm-delete-modal",
  });
  confirmDeletePopup.setEventListeners();

  // Card Section
  cardSection = new Section(
    { items: [], renderer: renderCard },
    selectors.cardSection
  );

  // Add Card Popup
  const cardAddPopupWithForm = new PopupWithForm(
    "#add-card-modal",
    (values) => {
      return api
        .addCard({ name: values.title, link: values.url })
        .then((newCard) => {
          renderCard(newCard);
          cardAddPopupWithForm.close(); // ← close on success
          addFormValidator.disableSubmitButton();
        })
        .catch((err) => {
          console.error("Error adding card:", err);
        });
    }
  );
  cardAddPopupWithForm.setEventListeners();

  // Edit Profile Popup
  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (values) => {
      return api
        .updateUserInfo({ name: values.name, about: values.about })
        .then((updatedUser) => {
          userInfo.setUserInfo(updatedUser);
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
        });
    }
  );
  profileEditPopup.setEventListeners();

  // Edit Avatar Popup
  const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (values) => {
    return api
      .updateAvatar(values.avatar)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
      });
  });
  avatarEditPopup.setEventListeners();

  // Image Preview Popup
  const imagePopup = new PopupWithImage("#popup-preview-modal");
  imagePopup.setEventListeners();

  // Load initial data
  api
    .getAppData()
    .then(([userData, cards]) => {
      userId = userData._id;
      userInfo.setUserInfo(userData);
      cardSection.renderItems(cards);
    })
    .catch((err) => console.error("Initialization error:", err));

  // Renders a single card, wiring up delete confirmation
  function renderCard(item) {
    const card = new Card(
      item,
      selectors.cardTemplate,
      handleImageClick,
      (cardInstance, cardId) => {
        confirmDeletePopup.setSubmitAction(() => {
          confirmDeletePopup.renderSaving(true);
          api
            .deleteCard(cardId)
            .then(() => {
              cardInstance.removeCard();
              confirmDeletePopup.close();
            })
            .catch((err) => console.error("Error deleting card:", err))
            .finally(() => {
              confirmDeletePopup.renderSaving(false);
            });
        });
        confirmDeletePopup.open();
      }
    );

    cardSection.addItem(card.getView());
  }

  // Button listeners
  dom.profileEditButton.addEventListener("click", () => {
    editFormValidator.resetValidation();
    profileEditPopup.setInputValues(userInfo.getUserInfo());
    profileEditPopup.open();
  });

  dom.cardAddButton.addEventListener("click", () => {
    addFormValidator.resetValidation();
    cardAddPopupWithForm.open();
  });

  dom.avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarEditPopup.open();
  });

  // Image click handler
  function handleImageClick(cardData) {
    imagePopup.open(cardData);
  }
});
