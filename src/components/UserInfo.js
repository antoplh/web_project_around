export default class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imageElement = document.querySelector(imageSelector);
    this._userId = "";
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      image: this._imageElement.src,
      userId: this._userId,
    };
  }
  setUserInfo({ name, job, id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._userId = id;
  }
  setUserAvatar({ image }) {
    this._imageElement.src = image;
  }
}
