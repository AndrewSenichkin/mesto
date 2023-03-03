export default class UserInfo {
      constructor({name, about, avatar}) {
        this._data = {
            name: name.textContent,
            about: about.textContent,
            avatar: avatar.textContent
        },
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }
    getUserInfo() {
        return {
            name: this._data.name,
            about: this._data.about,
            avatar: this._data.avatar
          }
    }
    
    setUserInfo(data) {
        this._data.name = data.name;
        this._data.about = data.about;
        this._data.avatar = data.avatar;
        if(data.name) {this._name.textContent = this._data.name}
        if(data.about) {this._about.textContent = this._data.about}
        if(data.avatar) {
            this._avatar.src = this._data.avatar
            this._avatar.alt = this._data.name
        }
    }
}