class Card {
    constructor(date, templateSelector, openImage) {
        this._name = date.name;
        this._link = date.link;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
    }
    _getTemplate() {
        this._element = document.querySelector(this._templateSelector).content.cloneNode(true);
        return this._element;
    }
    generateCard() {
        this._newCard = this._getTemplate();
        this._title = this._newCard.querySelector('.element__title');
        this._elementImage = this._newCard.querySelector('.element__image');
        this._trash = this._newCard.querySelector('.element__trash');
        this._like = this._newCard.querySelector('.element__smile');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._title.textContent = this._name;
        this._setEventListeners();
        return this._newCard;
    }
    _toggleLike() {
        this._like.classList.toggle('element__smile_active');
    }
    _deleteCard() {
        this._trash.closest('.element').remove();
    }
    _setEventListeners() {
        this._trash.addEventListener('click', ()=> {
            this._deleteCard();
        });
        this._like.addEventListener('click', () => {
            this._toggleLike();
        });
        this._elementImage.addEventListener('click', () => {
            this._openImage(this._name, this._link);
        });
    }
}
export {Card};