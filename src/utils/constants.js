// === Selectors ===
export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
};

// === Validation Settings ===
export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// === DOM Elements Getter ===
export function getDOMElements() {
  const profile = document.querySelector(".profile");
  const cardAddModal = document.querySelector("#add-card-modal");
  const imageModal = document.querySelector("#popup-preview-modal");
  const avatarModal = document.querySelector("#avatar-edit-modal");

  return {
    profile,
    profileEditButton: profile.querySelector("#profile-edit-button"),
    profileTitle: profile.querySelector("#profile-title"),
    profileDescription: profile.querySelector("#profile-description"),

    cardAddButton: profile.querySelector("#card-add-button"),
    cardListEl: document.querySelector(selectors.cardSection),
    cardTemplate: document.querySelector(selectors.cardTemplate),

    profileEdit: document.querySelector("#profile-edit-modal"),
    profileEditForm: document.querySelector("#edit-profile-form"),
    profileTitleInput: document.querySelector("#profile-title-input"),
    profileDescriptionInput: document.querySelector(
      "#profile-description-input"
    ),

    cardAdd: cardAddModal,
    cardAddForm: document.querySelector("#add-card-form"),
    cardTitleInput: cardAddModal.querySelector(".modal__input_type_title"),
    cardImageInput: cardAddModal.querySelector("#card-description-input"),
    cardURLInput: cardAddModal.querySelector(".modal__input_type_url"),

    imageModal,
    imageModalImage: imageModal.querySelector("#image-modal-image"),
    imageModalCaption: imageModal.querySelector("#modal-caption"),

    avatarEditForm: avatarModal.querySelector(".modal__form"),
    avatarEditButton: document.querySelector(".profile__avatar-edit-button"),

    confirmDeleteModal: document.querySelector("#confirm-delete-modal"),
  };
}
