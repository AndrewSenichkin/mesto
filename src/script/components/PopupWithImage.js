import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup) 
            this._popupImage = this._popup.querySelector('.popup__image');
            this._popupImageTitle = this._popup.querySelector('.popup__title-image');
    }
    open = (item) => {
        this._popupImageTitle.textContent = item.name;
        this._popupImage.alt = item.name;
        this._popupImage.src = item.link;
        super.open();
    }
}