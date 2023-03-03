export default class Section {
    constructor({renderer}, selectorContainer) {
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
    }
    addItem = (item) => {
        this._container.prepend(item);
    }
    renderItems(items) {
        items.forEach((item) => {
          return this._renderer(item); 
        });
      }
}