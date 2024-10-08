export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    // Renderizamos todos los elementos pasados en `items`
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // Añadimos un nuevo elemento al contenedor
    this._container.prepend(element);
  }
}
