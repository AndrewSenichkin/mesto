import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, callbackSubmitForm) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
    }
    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        })
        return values;
    }
    close() {
        super.close();
        this._form.reset();
    }
    setInputValue(data) {
        this._inputs.forEach((input) => {
            input.value = data[input.name]
        })
        return this._inputs
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const textReplace = evt.submitter.textContent;
            evt.submitter.textContent = 'Сохранение...';
            this._callbackSubmitForm(this._getInputValues())
            .then(() => this.close())
            .finally(() => {evt.submitter.textContent = textReplace})
        })
    }
}