class Form {
  form;

  guestName;
  guestAge;
  guestComment;

  checkbox;
  list;

  buttonSave;
  buttonRegister;

  titleOfFieldsContainer;
  companionsFieldsContainer;

  fields = [];
  guests = [];
  currentItemIndex;

  activeEdition = false;

  constructor() {
    this.form = document.getElementsByTagName("form");

    this.guestName = document.querySelector("#nome");
    this.guestAge = document.querySelector("#idade");
    this.guestComment = document.querySelector("#comentario");

    this.companionsFieldsContainer =
      document.querySelector("#fields-container");
    this.titleOfFieldsContainer = document.querySelector(".box-title");
    this.listOfCompanions = document.querySelector("#list");

    this.checkbox = document.querySelector("#checkbox");

    this.buttonRegister = document.querySelector("#btn-register");
    this.buttonSave = document.querySelector("#btn-save");
  }

  addField() {
    if (!this.checkbox.checked) {
      return;
    }

    this.fields.push({ name: "", age: "", bond: "" });
    this.renderFields();
  }

  removeField(index) {
    this.fields.splice(index, 1);
    this.renderFields();
  }

  validationForm() {
    const isValidFields = this.fields.every(
      (field) => field.name && field.age && field.bond
    );
    if (
      !this.guestName.value ||
      !this.guestAge.value ||
      (this.checkbox.checked && !isValidFields)
    ) {
      return false;
    }

    return true;
  }

  clearForm() {
    this.guestName.value = "";
    this.guestAge.value = "";
    this.guestComment.value = "";
    this.checkbox.checked = false;
    this.companionsFieldsContainer.innerHTML = "";

    this.changeCheckbox();
  }

  changeCheckbox() {
    if (!this.checkbox.checked) {
      this.fields = [];
      this.companionsFieldsContainer.innerHTML = "";
      this.titleOfFieldsContainer.style.display = "none";
      return;
    }

    this.titleOfFieldsContainer.style.display = "flex";

    this.renderFields();
  }

  updateField(index, key, value) {
    this.fields[index][key] = value;
  }

  renderFields() {
    this.companionsFieldsContainer.innerHTML = "";

    this.fields.forEach((field, index) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.className = "others-inputs";

      fieldDiv.innerHTML = `
        <input class="input-02" type="text" placeholder="Nome" value="${field.name}" onchange="onUpdateField(${index}, 'name', this.value)" />
        <input class="input-02" type="number" placeholder="Idade" value="${field.age}" onchange="onUpdateField(${index}, 'age', this.value)" />
        <input class="input-02" type="text" placeholder="Vínculo Ex.: Filho, Neto, Esposo(a)" value="${field.bond}" onchange="onUpdateField(${index}, 'bond', this.value)" />
        <button type="button" class="remove" onclick="onRemoveField(${index})">-</button>
      `;

      this.companionsFieldsContainer.appendChild(fieldDiv);
    });
  }

  renderCompanionsOfGuest(index) {
    this.companionsFieldsContainer.innerHTML = "";
    this.guests[index].others.forEach((field, index) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.className = "others-inputs";
      fieldDiv.innerHTML = "";
      fieldDiv.innerHTML = `
        <input class="input-02" type="text" placeholder="Nome" value="${field.name}" onchange="onUpdateField(${index}, 'name', this.value)" />
        <input class="input-02" type="number" placeholder="Idade" value="${field.age}" onchange="onUpdateField(${index}, 'age', this.value)" />
        <input class="input-02" type="text" placeholder="Vínculo Ex.: Filho, Neto, Esposo(a)" value="${field.bond}" onchange="onUpdateField(${index}, 'bond', this.value)" />
        <button type="button" class="remove" onclick="onRemoveField(${index})">-</button>
      `;

      this.companionsFieldsContainer.appendChild(fieldDiv);
    });
  }

  renderList() {
    const guestList = document.querySelector("#list");

    guestList.innerHTML = "";

    this.guests.forEach((field, index) => {
      guestList.innerHTML += `
        <div class='guest'>
          <p>Nome: ${field.name}</p>
          <p>Idade: ${field.age}</p>
          <p>Comentario: ${field.comment}</p>
          
          <img class="icon-edit" src="./assets/pen.png" onclick="onEnableListEditing(${index})"/>
          
          ${field.others
            .map(
              (otherField) => `
            <div class="separator"></div>
            <div class="item-list">
              <p>Nome: ${otherField.name}</p>
              <p>Idade: ${otherField.age}</p>
              <p>Vínculo: ${otherField.bond}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    });

    this.fields = [{ name: "", age: "", bond: "" }];
    this.clearForm();
  }

  sendForm() {
    const isValidFields = this.validationForm();
    if (!isValidFields) {
      alert("É necessário preencher todos os dados corretamente");
      return;
    }

    this.guests.push({
      id: Math.random(),
      name: this.guestName.value,
      age: this.guestAge.value,
      comment: this.guestComment.value,
      others: this.fields,
    });

    this.renderList();
  }

  saveModificationsInList() {
    const isValidForm = this.validationForm();

    if (!isValidForm) {
      alert("É necessário preencher todos os dados corretamente");
      return;
    }

    this.guests[this.currentItemIndex].name = this.guestName.value;
    this.guests[this.currentItemIndex].age = this.guestAge.value;
    this.guests[this.currentItemIndex].comment = this.guestComment.value;
    this.guests[this.currentItemIndex].others = this.fields;

    this.activeEdition = false;

    this.clearForm();

    this.changeButtonVisibility("initial", "none");

    this.renderList();
  }

  enableListEditing(index) {
    const guestHaveCompanions = this.guests[index].others.length > 0
    const editionIsActive = this.checkIdEditingIsActive();

    if (editionIsActive) {
      alert("A edição já está ativa. Salve as alterações para continuar");
      return;
    }

    if(guestHaveCompanions) {
      this.checkbox.checked = true
      this.changeCheckbox()
    }
    
    this.renderCompanionsOfGuest(index)
    this.changeButtonVisibility("none", "initial");

    this.guestName.value = this.guests[index].name;
    this.guestAge.value = this.guests[index].age;
    this.guestComment.value = this.guests[index].comment;

    this.activeEdition = true;
    this.currentItemIndex = index;

    this.fields = this.guests[index].others;
  }

  changeButtonVisibility(btnRegister, btnSave) {
    this.buttonRegister.style.display = btnRegister;
    this.buttonSave.style.display = btnSave;
  }

  checkIdEditingIsActive() {
    if (this.activeEdition) {
      return true;
    }

    return false;
  }
}

const form = new Form();

function onSubmitForm() {
  form.sendForm();
}

function onChangeCheckbox() {
  form.changeCheckbox();
}

function onAddField() {
  form.addField();
}

function onSaveModificationsInList() {
  form.saveModificationsInList();
}

function onUpdateField(index, key, value) {
  form.updateField(index, key, value);
}

function onEnableListEditing(index) {
  form.enableListEditing(index);
}

function onRemoveField(index) {
  form.removeField(index);
}
