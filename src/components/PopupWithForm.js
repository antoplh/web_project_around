import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, userInfo) {
    super(popupSelector);
    this._userInfo = userInfo;
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }
  open() {
    super.open();
    if (this._popupSelector == "#profile-popup" && this._userInfo) {
      const { name, job } = this._userInfo.getUserInfo();
      this._form.querySelector('input[name="name"]').value = name;
      this._form.querySelector('input[name="aboutme"]').value = job;
    }
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
