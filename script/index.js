const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');//Кнопка открытия попап-редактирования профиля
const closeIcon = document.querySelector('.popup__close-icon');//Кнопка закрытия попап-редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileMore = document.querySelector('.profile__more');
const inputName = document.querySelector('.popup__input_type_name');
const inputMore = document.querySelector('.popup__input_type_more');
const formElement = document.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');//Кнопка открытия попап-добаления карточек
const popupCards = document.querySelector('.popup_cards');
const closePopupCards = popupCards.querySelector('.popup__close-icon');//Кнопка закрытия попап-добаления карточек
const popupProfile = document.querySelector('.popup_profile');
const elementsCards = document.querySelector('.elements'); //Контейнер для карт
const template = document.querySelector('#todo-item-template').content;
const inputNameCard = document.querySelector('.popup__input_card-name'); // поле вводе карты для имени
const inputUrlCard = document.querySelector('.popup__input_card-url'); // поле ввода для карты для адреса на картинку
const submitCard = document.querySelector('.popup__form_card');
const popupImg = document.querySelector('.popup_image');
const photoImg = document.querySelector('.popup__image'); 
const popupImgTitle = document.querySelector('.popup__title-image');
const closeImg = popupImg.querySelector('.popup__close-icon');//Кнопка закрытия попап фото
//Создаем карточку
const createTodo = (value) => {
    const createCard = template.querySelector('.element').cloneNode(true);
    createCard.querySelector('.element__image').src = value.link;
    createCard.querySelector('.element__image').alt = value.name;
    createCard.querySelector('.element__title').textContent = value.name;
    createCard.querySelector('.element__trash').addEventListener('click', () => {
        createCard.remove();
    });
    createCard.querySelector('.element__smile').addEventListener('click', function(event) {
        event.target.classList.toggle('element__smile_active');
    });
    createCard.querySelector('.element__image').addEventListener('click', () => {
        openImage(createCard, value.link);
    });
    return createCard;
}

function closePopupEsc(event) {
    if(event.code == 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function openImage (card, link) {
    const title = card.querySelector('.element__title').textContent;
    photoImg.src = link;
    photoImg.alt = title;
    popupImgTitle.textContent = title;
    openPopup(popupImg);
}

function renderCard(card, container) {
    container.prepend(card);
}
function render() {
    initialCards.forEach((value) => {
      const newCard = createTodo(value);
      if (newCard) renderCard(newCard, elementsCards)
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
    document.addEventListener('keydown', closePopupEsc);
}
function closePopup(closePopup) {
    closePopup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}
function sendForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileMore.textContent = inputMore.value;
    closePopup(popupProfile);
}
closeImg.addEventListener('click', () => {
    closePopup(popupImg);
});

editButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputMore.value = profileMore.textContent;
    openPopup(popupProfile);
});

closeIcon.addEventListener('click', () => {
    closePopup(popupProfile);
});

formElement.addEventListener('submit', sendForm);

addButton.addEventListener('click', () => {
    openPopup(popupCards);
});

closePopupCards.addEventListener('click',() => {
    closePopup(popupCards);
    inputNameCard.value = '';
    inputUrlCard.value = '';
});

function sumbmitCard(event) {
    event.preventDefault();
    const name = inputNameCard.value;
    const link = inputUrlCard.value;
    const cardNew = createTodo({name, link});
    if(cardNew) renderCard(cardNew, elementsCards);
    closePopup(popupCards);
    submitCard.reset();
}
submitCard.addEventListener('submit', sumbmitCard);