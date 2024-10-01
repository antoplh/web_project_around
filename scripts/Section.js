import { Card } from "./Card.js";

export class Section {
  constructor({ items, renderer }, containerSelector) {
    (this._items = items),
      (this._renderer = renderer),
      (this._container = document.querySelector(containerSelector));
  }
  renderer() {
    // renderiza todos los elementos de la pagina
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem() {
    // toma un elemento del DOM y lo agrega al contenedor
    
  }
}
