export default class Api {
  constructor(options) {
      // тело конструктора
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _handleResponce(res) {
      if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
  }

    async getInitialCards() {
      const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      return this._handleResponce(response);
  }
    
    async getAboutUserInfo() {
      const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    return this._handleResponce(response);
  }

    async editProfileUserInfo(data) {
      const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
          name: data.name,
          about: data.about
          }),
    })
    return this._handleResponce(response);
  }
    async addNewCard(data) {
      const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
      })
      return this._handleResponce(response);
  }
    async deleteCard(dataId) {
      const response = await fetch(`${this._baseUrl}/cards/${dataId}`, {
    method: "DELETE",  
    headers: this._headers
    })
    return this._handleResponce(response);
  }
    async addLike(dataId) {
      const response = await fetch(`${this._baseUrl}/cards/${dataId}/likes`, {
        method: "PUT",
        headers: this._headers
      })
      return this._handleResponce(response);
    }
    async deleteLike(dataId) {
      const response = await fetch(`${this._baseUrl}/cards/${dataId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      return this._handleResponce(response);
    }

    async updateProfileUserAvatar(data) {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        }),
      })
      return this._handleResponce(response);
    }
}