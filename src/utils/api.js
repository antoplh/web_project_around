class Api {
  constructor(options) {
    this._baseUrl = `${options.address}/v1/${options.groupId}`;
    this._headers = { authorization: options.token };
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}.`);
  }

  _request(endpoint, method, body = null) {
    const config = {
      method: method,
      headers: {
        ...this._headers,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    return fetch(`${this._baseUrl}/${endpoint}`, config).then((res) =>
      this._checkResponse(res)
    );
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`cards/likes/${cardId}`, isLiked ? "PUT" : "DELETE");
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, "DELETE");
  }

  setUserInfo(data) {
    return this._request("users/me", "PATCH", data);
  }

  getUserInfo() {
    return this._request("users/me", "GET");
  }

  getCards() {
    return this._request("cards", "GET");
  }

  setUserAvatar(data) {
    return this._request("users/me/avatar", "PATCH", { avatar: data.avatar });
  }

  addCard(data) {
    return this._request("cards", "POST", data);
  }
}
const api = new Api({
  address: "https://around.nomoreparties.co",
  groupId: `web-es-cohort-16`,
  token: `3affd1de-5700-4699-bd1e-708179068d5e`,
});

export default api;
