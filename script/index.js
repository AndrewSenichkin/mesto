let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileMore = document.querySelector('.profile__more');
let inputName = document.querySelector('.popup__input_type_name');
let inputMore = document.querySelector('.popup__input_type_more');
let formElement = document.querySelector('.popup__form');

function openPopup () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputMore.value = profileMore.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function sendForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileMore.textContent = inputMore.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);
formElement.addEventListener('submit', sendForm);
