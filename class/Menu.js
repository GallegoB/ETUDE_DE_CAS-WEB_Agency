"use strict";

class Menu {
  labels;
  menuElement;
  esp;
  disp;
  constructor(labels = [], esp = 20, disp = 0) {
    this.labels = labels; // tableau de string (les items du menu).
    this.esp = esp; // Espacement entre les éléments du menu.
    this.disp = disp; // Orientation du menu (0 = horizontal, 1 = vertical).
    this.menuElement = this.createMenu();
  }

  createMenu() {
    // création de element <ul> HTMLUListElement
    this.menuElement = document.createElement("ul");

    this.setDisp(this.disp);

    // On  parcoure le tableau est on crée les élément <li>
    this.labels.forEach((label, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = label;
      // ajouter un attribue data-index en valeur index
      listItem.setAttribute("data-index", index);
      //ajout de l'événement
      listItem.addEventListener("click", (evt) => this.handleItemClick(evt));

      this.menuElement.appendChild(listItem);
    });

    this.setEsp(this.esp);
    // retourne la menu
    return this.menuElement;
  }

  // Méthode pour gérer le clic sur un élément
  handleItemClick(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const customEvent = new CustomEvent("menu_click", {
      detail: { index: index },
    });
    this.menuElement.dispatchEvent(customEvent);
  }

  //retourne l'objet DOM HTMLUListElement encapsulé.
  getObjDOM() {
    return this.menuElement;
  }

  // Méthode pour définir l'espacement entre les éléments du menu
  setEsp(esp) {
    // Espacement entre les éléments du menu en fonction de horizontal ou verticale
    const listItem = this.menuElement.querySelectorAll("ul li");
    listItem.forEach((li) => {
      // Menu horizontal
      li.style.marginRight = esp + "px";
      // Menu Verticale
      li.style.marginBottom = esp + "px";
    });
    return this;
  }

  // Méthode pour définir l'orientation du menu (horizontal ou vertical)
  setDisp(disp) {
    // Orientation du menu (0 = horizontal, 1 = vertical).
    this.menuElement.style.listStyle = "none";
    this.menuElement.style.padding = "0";
    if (disp === 0) {
      // Menu horizontal
      this.menuElement.style.display = "flex";
    } else if (disp === 1) {
      // Menu vertical
      this.menuElement.style.display = "block";
    }
    return this;
  }

  addItem(label) {
    this.labels.push(label);
    // on crée un <li>
    const listItem = document.createElement("li");
    listItem.textContent = label;
    // ajouter un attribue data-index en valeur index
    listItem.setAttribute("data-index", this.labels.length - 1);
    //ajout de l'événement
    listItem.addEventListener("click", (evt) => this.handleItemClick(evt));
    //ajout à la liste
    this.menuElement.appendChild(listItem);
    // mis à jour des esp et  Disp
    this.setEsp(this.esp).setDisp(this.setDisp);
    return this;
  }
}
