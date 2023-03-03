import './index.css';
import Card from "./script/components/Card.js";
import {FormValidator} from "./script/components/FormValidator.js";
import Section from "./script/components/Section.js";
import PopupWithImage from "./script/components/PopupWithImage.js";
import PopupConfirm from './script/components/popupConfirm.js';
import UserInfo from "./script/components/UserInfo.js";
import PopupWithForm from "./script/components/PopupWithForm.js";
import {validateConfig}  from "./script/variables/validateConfig.js";
import {popupConfig} from "./script/variables/popupConfig.js";
import {formProfile, formAddCard, inputName, inputMore, buttonOpenPopupCard, buttonEditProfile, avatar, formUpdateAvatar, profileUpdateAvatar} from './script/variables/constants.js';
import Api from './script/components/Api.js';
let userId;
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: '3bdb898d-578c-4d59-b2f0-6cedbf150f8e',
      'Content-Type': 'application/json'
    }
});

async function submitFormProfile(data) {
    try {
        const userProfile = await api.editProfileUserInfo(data);
        userInfo.setUserInfo(userProfile);
    } catch (err) {
        return console.log(`Ошибка: ${err}`);
    }
}

async function submitFormAddCard(data) {
    try {
        const newCard = await api.addNewCard(data);
        SectionForCard.addItem(createNewCard(newCard));
    } catch (err) {
        return console.log(`Ошибка: ${err}`);
    }
}

async function submitFormUpdateAvatar(data) {
    try {
        const userProfile = await api.updateProfileUserAvatar(data);
        userInfo.setUserInfo(userProfile);
    } catch (err) {return console.log(`Ошибка: ${err}`)}
}

Promise.all([api.getAboutUserInfo(), api.getInitialCards()])
.then(([userProfile, cards]) => {
    userInfo.setUserInfo(userProfile);
    userId = userProfile._id;
    SectionForCard.renderItems(cards);
})
.catch(err => console.log(`Ошибка: ${err}`));

function createNewCard(item) {
    const card = new Card(item, '.todo-item-template', openImage,
    userId, async () => {
        try {
            const response = await api.addLike(item._id);
            card.like();
            card.likeCount(response);
        } catch (err) { return console.log(`Ошибка: ${err}`);}
    },
    async () => {
        try {
            const response = await api.deleteLike(item._id);
            card.disLike();
            card.likeCount(response);
        } catch (err) {return console.log(`Ошибка: ${err}`);}
    },
    () => popupConfirm.open(card)
    )
    return card.generateCard();
}
const popupConfirm = new PopupConfirm(
    popupConfig.popupSelectorDelete,
    async (card) => {
        api.deleteCard(card._id)
        .then(() => {
            card.remove();
            popupConfirm.close();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }
); 
function openImage(name, link) {
    popupOpenImage.open(name, link)
}
const SectionForCard = new Section({ renderer: (item) => {
    const card = createNewCard(item);
    SectionForCard.addItem(card);
    },
}, 
'.elements'
)
const userInfo = new UserInfo({name: inputName, about: inputMore, avatar: avatar});

const openPopupCard = new PopupWithForm(popupConfig.popupCards, submitFormAddCard);

const popupAvatar = new PopupWithForm(popupConfig.popupSlectorAvatarUpdate, submitFormUpdateAvatar);

const popupEditForm = new PopupWithForm(popupConfig.popupProfile, submitFormProfile);

const popupOpenImage = new PopupWithImage(popupConfig.popupImage);

const validatorFormUpdateAvatar = new FormValidator(validateConfig, formUpdateAvatar);
validatorFormUpdateAvatar.enableValidation();

const popupProfileValidation = new FormValidator(validateConfig, formProfile);
popupProfileValidation.enableValidation();

const popupAddCardValidation = new FormValidator(validateConfig, formAddCard);
popupAddCardValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => {
    popupEditForm.open();
    popupEditForm.setInputValue(userInfo.getUserInfo());
    popupProfileValidation.disabledButtonAfterSubmit();
}, false);

buttonOpenPopupCard.addEventListener('click', () => {
    openPopupCard.open();
    popupAddCardValidation.disabledButtonAfterSubmit();
}, false);

profileUpdateAvatar.addEventListener('click', () => {
    popupAvatar
    .open();
    validatorFormUpdateAvatar.disabledButtonAfterSubmit();
})