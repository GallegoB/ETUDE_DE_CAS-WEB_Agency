"use strict";

class Menu {
  labels;
  menuElement;
  constructor(labels = [], esp = 20, disp = 0) {
    this.labels = labels; // tableau de string (les items du menu).
    this.menuElement = this.createMenu();
  }

  createMenu() {
    // création de element <ul> HTMLUListElement
    const menu = document.createElement("ul");
    // On  parcoure le tableau est on crée les élément <li>
    this.labels.forEach((label, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = label;
      // ajouter un atrubue data-index avec index en
      listItem.setAttribute("data-index", index);
      listItem.addEventListener("click", (evt) => this.handleItemClick(evt));
      menu.appendChild(listItem);
    });
    // returoune la menu
    return menu;
  }

  handleItemClick(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const customEvent = new CustomEvent("menu_click", {
      detail: { index: index },
    });
    this.menuElement.dispatchEvent(customEvent);
  }

  getObjDOM() {
    return this.menuElement;
  }
}
