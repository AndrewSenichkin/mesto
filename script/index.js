import {Card} from "./Card.js";
import {validateConfig}  from "./validateConfig.js";
import {initialCards} from "./initCards.js";
import {FormValidator} from "./FormValidator.js";

const buttonEditProfile = document.querySelector('.profile__edit-button');//Кнопка открытия попап-редактирования профиля
const buttonCloseProfile = document.querySelector('.popup__close-icon');//Кнопка закрытия попап-редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileMore = document.querySelector('.profile__more');
const nameInput = document.querySelector('.popup__input_type_name');
const infoInput = document.querySelector('.popup__input_type_more');
const formElement = document.querySelector('.popup__form');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');//Кнопка открытия попап-добаления карточек
const popupCards = document.querySelector('.popup_cards');
const popupCloseCards = popupCards.querySelector('.popup__close-icon');//Кнопка закрытия попап-добаления карточек
const popupProfile = document.querySelector('.popup_profile');
const elementsCards = document.querySelector('.elements'); //Контейнер для карт
const nameInputCard = document.querySelector('.popup__input_card-name'); // поле вводе карты для имени
const urlInputCard = document.querySelector('.popup__input_card-url'); // поле ввода для карты для адреса на картинку
const cardSubmit = document.querySelector('.popup__form_card');
const popupImg = document.querySelector('.popup_image');
const photoImg = document.querySelector('.popup__image'); 
const popupImgTitle = document.querySelector('.popup__title-image');
const buttonCloseImg = popupImg.querySelector('.popup__close-icon');//Кнопка закрытия попап фото

const popupProfileValidation = new FormValidator(validateConfig, popupProfile);
popupProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validateConfig, popupCards);
popupAddCardValidation.enableValidation();

function handleClosePopupEsc(event) {
    if(event.code == 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function openImage (card, link) {
    photoImg.src = link;
    photoImg.alt = card;
    popupImgTitle.textContent = card;
    openPopup(popupImg);
}
function createNewCard(value) {
    const card =  new Card(value, '#todo-item-template', openImage);
    return card;
}
function renderCard(card, container) {
    container.prepend(card);
}
function render() {
    initialCards.forEach((value) => {
    const newCard = createNewCard(value);
    renderCard(newCard.generateCard(), elementsCards)
    });
}
render();

function closePopupOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function openPopup (openPopup) {
    openPopup.classList.add('popup_opened');
    document.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', handleClosePopupEsc);
}
function closePopup(closePopup) {
    closePopup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', handleClosePopupEsc);
}
function savEditedProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileMore.textContent = infoInput.value;
    closePopup(popupProfile);
}
buttonCloseImg.addEventListener('click', () => {
    closePopup(popupImg);
});

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    infoInput.value = profileMore.textContent;
    popupProfileValidation.disabledButtonAfterSubmit();
    openPopup(popupProfile);
});

buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});

formElement.addEventListener('submit', savEditedProfile);

buttonOpenPopupCard.addEventListener('click', () => {
    popupAddCardValidation.disabledButtonAfterSubmit();
    openPopup(popupCards);
});

popupCloseCards.addEventListener('click',() => {
    closePopup(popupCards);
    nameInputCard.value = '';
    urlInputCard.value = '';
});

function sumbmitCard(event) {
    event.preventDefault();
    const name = nameInputCard.value;
    const link = urlInputCard.value;
    const cardNew = createNewCard({name, link});
    renderCard(cardNew.generateCard(), elementsCards);
    closePopup(popupCards);
    cardSubmit.reset();
}
cardSubmit.addEventListener('submit', sumbmitCard);