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
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardButton = document.querySelector("#card-add-button");
const addCardbuttonModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardbuttonModal.querySelector(".modal__close");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardbuttonModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewModal = document.querySelector("#popup-preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close");
const modalImageElement = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopup(previewModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
////
const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector("modal_opened");
  if (evt.key === "escape") {
    action(activePopup);
  }
};

const openModal = (modalWindow) => {
  modalWindow.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
};

const closeModal = (modalWindow) => {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};
////
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardbuttonModal);
  e.target.reset();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardbuttonModal);
});

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(profileEditModal);
  }
});

addCardbuttonModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(addCardbuttonModal);
  }
});

previewModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(previewModal);
  }
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
