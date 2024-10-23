export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}.`);
    }
  }
  get(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  patch(endpoint, body) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => this._checkResponse(res));
  }
  post(endpoint, body) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => this._checkResponse(res));
  }
  delete(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  put(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
