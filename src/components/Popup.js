export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._button = this._popup.querySelector('.popup__close-icon');
        this._clickCloseButton = this._handleSubmit.bind(this);
        this._clickEscClose = this._handleEscClose.bind(this);
        this._clickClose = this._handleOverLayClose.bind(this);
        this._button.addEventListener('click', this._clickCloseButton);
    }

    open() {
        this.setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._clickEscClose);
    }

    _handleEscClose(event) {
        if(event.code == 'Escape') {
            this.close();
        }
    }

    _handleOverLayClose(evt) {
        if(evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handleSubmit() {
        this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('mouseup', this._clickClose);
        document.addEventListener('keydown', this._clickEscClose);
    }
}