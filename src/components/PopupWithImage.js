import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup) 
            this._popupImage = this._popup.querySelector('.popup__image');
            this._popupImageTitle = this._popup.querySelector('.popup__title-image');
    }
    open (name, link)  {
        this._popupImageTitle.textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
        super.open();
    }
}