export const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Lousie",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

//

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
};

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//

export function getDOMElements() {
  const profile = document.querySelector(".profile");
  const cardAdd = document.querySelector("#add-card-modal");
  const imageModal = document.querySelector("#popup-preview-modal");

  return {
    profile,
    profileEditButton: profile.querySelector("#profile-edit-button"),
    profileTitle: profile.querySelector("#profile-title"),
    profileDescription: profile.querySelector("#profile-description"),
    cardListEl: document.querySelector(".cards__list"),
    cardTemplate: document.querySelector("#card-template"),
    cardAddButton: profile.querySelector("#card-add-button"),
    profileEdit: document.querySelector("#profile-edit-modal"),
    profileEditForm: document.querySelector("#edit-profile-form"),
    profileTitleInput: document.querySelector("#profile-title-input"),
    profileDescriptionInput: document.querySelector(
      "#profile-description-input"
    ),
    cardAdd,
    cardAddForm: document.querySelector("#add-card-form"),
    cardTitleInput: cardAdd.querySelector(".modal__input_type_title"),
    cardImageInput: cardAdd.querySelector("#card-description-input"),
    cardURLInput: cardAdd.querySelector(".modal__input_type_url"),
    imageModal,
    imageModalImage: imageModal.querySelector("#image-modal-image"),
    imageModalCaption: imageModal.querySelector("#modal-caption"),
  };
}
