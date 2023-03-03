class FormValidator {
    constructor(config, popup) {
        this._config = config;
        this._popup = popup;
        this._buttonSave = this._popup.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._popup.querySelectorAll(this._config.inputSelector));
    }
    enableValidation() {
        this._setEventListeners();
    }
    disableButton() {
        this._buttonSave.classList.add(this._config.inactiveButtonClass);
        this._buttonSave.disabled = true;
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
    _toggleButtonSituation() {
        if(this._hasInvalidInput()) {
            this.disableButton();
            this._buttonSave.disabled = true;
        }
        else {
            this._buttonSave.classList.remove(this._config.inactiveButtonClass);
            this._buttonSave.disabled = false;
        }
    }
    _hideInputError(inputElement) {
        const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }
    _showInputError(inputElement) {
        const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.errorClass);
    }
    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonSituation();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonSituation();
            });
        });
    }
}

export {FormValidator}