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

  const confirmDeletePopup = new PopupWithConfirm({
    popupSelector: "#confirm-delete-modal",
  });
  confirmDeletePopup.setEventListeners();

  cardSection = new Section(
    { items: [], renderer: renderCard },
    selectors.cardSection
  );

  const cardAddPopupWithForm = new PopupWithForm(
    "#add-card-modal",
    (values) => {
      return api
        .addCard({ name: values.title, link: values.url })
        .then((newCard) => {
          renderCard(newCard);
          addFormValidator.disableSubmitButton();
        });
    }
  );
  cardAddPopupWithForm.setEventListeners();

  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (values) => {
      return api
        .updateUserInfo({ name: values.name, about: values.about })
        .then((updatedUser) => {
          userInfo.setUserInfo(updatedUser);
        });
    }
  );
  profileEditPopup.setEventListeners();

  const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (values) => {
    return api.updateAvatar(values.avatar).then((res) => {
      userInfo.setAvatar(res.avatar);
    });
  });
  avatarEditPopup.setEventListeners();

  const imagePopup = new PopupWithImage("#popup-preview-modal");
  imagePopup.setEventListeners();

  api.getAppData().then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  });

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
            .finally(() => {
              confirmDeletePopup.renderSaving(false);
            });
        });
        confirmDeletePopup.open();
      },
      (cardInstance) => {
        const cardId = cardInstance.getId();
        const isLiked = cardInstance.isLiked();

        const request = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

        request
          .then((updatedCard) => {
            if (typeof updatedCard.isLiked !== "boolean") {
              throw new Error("Invalid like response");
            }
            cardInstance.updateLikes(updatedCard);
          })
          .catch((err) => {
            console.error("Failed to toggle like:", err);
          });
      },
      userId
    );

    cardSection.addItem(card.getView());
  }

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

  function handleImageClick(cardData) {
    imagePopup.open(cardData);
  }
});
