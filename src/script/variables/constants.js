const formProfile = document.forms.formPopup;
const formAddCard = document.forms.formAddCard;

const inputName = document.querySelector('.profile__name');
const inputMore = document.querySelector('.profile__more');
const avatar = document.querySelector('.profile__avatar');

const profileUpdateAvatar = document.querySelector('.profile__edit-avatar')
const formUpdateAvatar = document.forms.editAvatarForm;

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');

export {formProfile, 
    formAddCard, 
    inputName, 
    inputMore, 
    buttonEditProfile, 
    buttonOpenPopupCard, 
    avatar, 
    formUpdateAvatar, 
    profileUpdateAvatar}