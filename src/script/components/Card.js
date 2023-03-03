export default class Card {
    constructor(data, templateSelector, openImage, userId, like, disLike, deleteCard) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
        this._userId = userId;
        this._like = like;
        this._disLike = disLike;
        this._deleteCard = deleteCard;
    }
     _getTemplate() {
         this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
         return this._element;
    }
     generateCard = () => {
         this._newCard = this._getTemplate();
         this._title = this._newCard.querySelector('.element__title');
         this._elementImage = this._newCard.querySelector('.element__image');
         this._trash = this._newCard.querySelector('.element__trash');
         this._likeButton = this._newCard.querySelector('.element__smile');
         this._elementImage.src = this._link;
         this._elementImage.alt = this._name;
         this._title.textContent = this._name;
        //Подсчет лайков
         this._likesCount = this._newCard.querySelector('.element__count-likes');
         this._likesCount.textContent = this._likes.length;
         if (this._ownerId !== this._userId) {this._trash.remove()}

         this._setEventListeners();
         this._userLiked();
         return this._newCard;
    }
    
    like() {
        this._likeButton.classList.add('element__smile_active');
    }
    disLike() {
        this._likeButton.classList.remove('element__smile_active')
    }
    _userLiked() {
        this._likes.forEach((elementId) => {
            if(elementId._id === this._userId) {this.like()}
            else {this.disLike()}
        })
    }

    likeCount(res) {
        this._likesCount.textContent = `${res.likes.length}`;
    }
    remove() {
        this._newCard.remove();
    }

    _setEventListeners() {
        this._trash.addEventListener('click', ()=> {
            this._deleteCard(this._id);
        });
        this._likeButton.addEventListener('click', () => {
            if(this._likeButton.classList.contains('element__smile_active')) {
                this._disLike();
            }else {
                this._like();
            }
        });
        this._elementImage.addEventListener('click', () => {
            this._openImage(this._name, this._link);
        });
    }
}