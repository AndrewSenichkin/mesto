import './index.css';
import Card from "./script/components/Card.js";
import {FormValidator} from "./script/components/FormValidator.js";
import Section from "./script/components/Section.js";
import PopupWithImage from "./script/components/PopupWithImage.js";
import UserInfo from "./script/components/UserInfo.js";
import PopupWithForm from "./script/components/PopupWithForm.js";
import {validateConfig}  from "./script/variables/validateConfig.js";
import {initialCards} from "./script/variables/initCards.js";
import {popupConfig} from "./script/variables/popupConfig.js";
import {formProfile, formAddCard, inputName, inputMore, buttonOpenPopupCard, buttonEditProfile} from './script/variables/constants.js';

function createNewCard(item) {
    return new Card(item, '.todo-item-template', () => popupOpenImage.open(item)).generateCard() 
}
const SectionForCard = new Section(
    {
        renderer: (item) => SectionForCard.addItem(createNewCard(item))  
    },
        '.elements');

function saveFormValue(value) {
    userInfo.setUserInfo(value.inputName, value.inputMore);
    popupEditForm.close();
}

function openProfile() {
    const {title, subtitle} = userInfo.getUserInfo()
    inputName.value = title;
    inputMore.value = subtitle;
    popupProfileValidation.disabledButtonAfterSubmit();
    popupEditForm.open();
}

function openPopupAddCard() {
    popupAddCardValidation.disabledButtonAfterSubmit();
    openPopupCard.open();
}

const openPopupCard = new PopupWithForm(popupConfig.popupCards, 
    (item) => {
        SectionForCard.addItem(createNewCard(item));
        openPopupCard.close();
    }
);
openPopupCard.setEventListeners();

const userInfo = new UserInfo({title: '.profile__name', subtitle: '.profile__more'});

const popupEditForm = new PopupWithForm(popupConfig.popupProfile, saveFormValue)
popupEditForm.setEventListeners();

const popupOpenImage = new PopupWithImage(popupConfig.popupImage);
popupOpenImage.setEventListeners();

const popupProfileValidation = new FormValidator(validateConfig, formProfile);
popupProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validateConfig, formAddCard);
popupAddCardValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => openProfile());
buttonOpenPopupCard.addEventListener('click', () => openPopupAddCard());

SectionForCard.renderItems(initialCards);