export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  updateUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(avatarUrl) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  getInitialCards() {
    return this._request("/cards");
  }

  addCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    }).then((res) => {
      if (!res || typeof res.isLiked !== "boolean") {
        throw new Error("Invalid like response");
      }
      return res;
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    }).then((res) => {
      if (!res || typeof res.isLiked !== "boolean") {
        throw new Error("Invalid unlike response");
      }
      return res;
    });
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
