class Form {
  form

  guestName
  guestAge
  guestComment

  checkbox
  list

  buttonSave
  buttonRegister

  companionsFieldsContainer

  fields = [{ name: "", age: "", bond: "" }];
  guests = [];
  currentItemIndex

  constructor() {
    this.form = document.getElementsByTagName("form");

    this.guestName = document.querySelector("#nome");
    this.guestAge = document.querySelector("#idade");
    this.guestComment = document.querySelector("#comentario");

    this.companionsFieldsContainer = document.querySelector("#fields-container");
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

  clearForm() {
    this.guestName.value = "";
    this.guestAge.value = "";
    this.guestComment.value = "";
    this.checkbox.checked = false;
    this.companionsFieldsContainer.innerHTML = "";
  }
  
  changeCheckbox() {
    this.renderFields();
  }

  updateField(index, key, value) {
    this.fields[index][key] = value;
  }

  renderFields() {
    if (!this.checkbox.checked) {
      return (this.companionsFieldsContainer.innerHTML = "");
    }
  
    this.companionsFieldsContainer.innerHTML = "";
  
    this.fields.forEach((field, index) => {
      const fieldDiv = document.createElement("div");
      fieldDiv.className = "others-inputs";
  
      fieldDiv.innerHTML = `
        <input class="input-02" type="text" placeholder="Nome" value="${field.name}" onchange="onUpdateField(${index}, 'name', this.value)" />
        <input class="input-02" type="number" placeholder="Idade" value="${field.age}" onchange="onUpdateField(${index}, 'age', this.value)" />
        <input class="input-02" type="text" placeholder="Vínculo Ex.: Filho, Neto, Esposo(a)" value="${field.bond}" onchange="onUpdateField(${index}, 'bond', this.value)" />
        <button type="button" class="remove" onclick="removeField(${index})">-</button>
      `;
  
      this.companionsFieldsContainer.appendChild(fieldDiv);
    });
  }

  renderList() {
    const others = document.querySelector("#list");
  
    others.innerHTML = ''
  
   this.guests.forEach((field, index) => {
      others.innerHTML += `
        <div class='guest'>
          <p>Nome: ${field.name}</p>
          <p>Idade: ${field.age}</p>
          <p>Comentario: ${field.comment}</p>
          
          <img class="icon-edit" src="./assets/pen.png" onclick="onEditList(${index})"/>
          
          ${field.others.map((otherField) => `
          <div class="separator"></div>
            <div class='item-list'>
              <p>Nome: ${otherField.name}</p>
              <p>Idade: ${otherField.age}</p>
              <p>Vínculo: ${otherField.bond}</p>
            </div>
          `).join('')}
        </div>
      `;
    });
  
    this.fields = [{ name: "", age: "", bond: "" }];
    this.clearForm();
  }

  sendForm() {
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
      this.guests[this.currentItemIndex].name = this.guestName.value
      this.guests[this.currentItemIndex].age = this.guestAge.value
      this.guests[this.currentItemIndex].comment = this.guestComment.value
      this.guests[this.currentItemIndex].others = this.fields
  
      this.setDefaultValueOfPrimaryInputs()
  
      this.changeButtonVisibility('initial', 'none')
  
      this.renderList()
  }
  
  editList(index) {
    this.guestName.value = this.guests[index].name
    this.guestAge.value = this.guests[index].age
    this.guestComment.value = this.guests[index].comment

    this.currentItemIndex = index

    this.changeButtonVisibility('none', 'initial')
  
  
    this.guests[index].others.forEach((field, index) => {
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
  
    this.fields = this.guests[index].others
  }

  setDefaultValueOfPrimaryInputs() {
    this.guestName.value = ''
    this.guestAge.value = ''
    this.guestComment.value = ''
  }

  changeButtonVisibility(btnRegister, btnSave) {
      this.buttonRegister.style.display = btnRegister;
      this.buttonSave.style.display = btnSave;
  }
}

const form = new Form()

function onSubmitForm() {
  form.sendForm()
}

function onChangeCheckbox() {
  form.changeCheckbox()
}

function onAddField() {
  form.addField()
}

function onSaveModificationsInList() {
  form.saveModificationsInList()
}

function onUpdateField(index, key, value) {
  form.updateField(index, key, value)
}

function onEditList(index) {
  form.editList(index)
}

function onRemoveField () {
  form.removeField()
}