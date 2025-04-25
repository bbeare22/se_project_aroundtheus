import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardButton = document.querySelector("#card-add-button");
const addCardbuttonModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardbuttonModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardSelector = document.querySelector("#card-template");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewModal = document.querySelector("#popup-preview-modal");
const modalImageElement = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

// Validation \\
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();

// Functions \\
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalEsc);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalEsc);
}

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function openProfileForm() {
  editFormValidator.resetValidation();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function handleImageClick(cardData) {
  modalImageElement.src = cardData.link;
  modalCaption.textContent = cardData.name;
  modalImageElement.alt = `Photo of ${cardData.name}`;
  openModal(previewModal);
}

function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}

// Event Handlers \\
function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const newTitle = cardTitleInput.value;
  const newLink = cardURLInput.value;
  const newCardData = getCardElement({
    name: newTitle,
    link: newLink,
  });
  renderCard(newCardData, cardListEl);
  closeModal(addCardbuttonModal);
  addCardFormElement.reset();
  addFormValidator.disableSubmitButton();
}

// Event Listeners \\
profileEditButton.addEventListener("click", openProfileForm);
profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardButton.addEventListener("click", () => openModal(addCardbuttonModal));
addCardFormElement.addEventListener("submit", handleCardAddSubmit);

// Loops \\
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
