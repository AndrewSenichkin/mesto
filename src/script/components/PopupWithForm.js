import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, callbackSubmitForm) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
    }
    _getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._callbackSubmitForm(this._getInputValues());    
        })  
    };
}