import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, callbackSubmitForm) {
        super(selectorPopup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
        this._form.addEventListener('submit', (evt) => {
            debugger
            evt.preventDefault();
            const textReplace = evt.submitter.textContent;
            evt.submitter.textContent = 'Сохранение...';
            this._callbackSubmitForm(this._getInputValues())
            .then(() => this.close())
            .finally(() => {evt.submitter.textContent = textReplace})
        })
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
        debugger
        this._inputs.forEach((input) => {
            input.value = data[input.name]
        })
        return this._inputs
    }
}