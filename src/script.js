const fieldsContainer = document.querySelector("#fields-container");
const participantName = document.querySelector("#nome");
const age = document.querySelector("#idade");
const comment = document.querySelector("#comentario");
const checkbox = document.querySelector("#checkbox");
const list = document.querySelector("#list");
const buttonRegister = document.querySelector("#btn-register");
const buttonSave = document.querySelector("#btn-save");

let fields = [{ name: "", age: "", bond: "" }];
const guest = [];
let currentItemIndex

function changeCheckbox() {
  renderFields();
}

function updateField(index, key, value) {
  fields[index][key] = value;
}

function addField() {
  if (!checkbox.checked) {
    return;
  }

  fields.push({ name: "", age: "", bond: "" });
  renderFields();
}

function removeField(index) {
  fields.splice(index, 1);
  renderFields();
}

function renderFields() {
  if (!checkbox.checked) {
    return (fieldsContainer.innerHTML = "");
  }

  fieldsContainer.innerHTML = "";

  fields.forEach((field, index) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "others-inputs";

    fieldDiv.innerHTML = `
      <input class="input-02" type="text" placeholder="Nome" value="${field.name}" onchange="updateField(${index}, 'name', this.value)" />
      <input class="input-02" type="number" placeholder="Idade" value="${field.age}" onchange="updateField(${index}, 'age', this.value)" />
      <input class="input-02" type="text" placeholder="Vínculo Ex.: Filho, Neto, Esposo(a)" value="${field.bond}" onchange="updateField(${index}, 'bond', this.value)" />
      <button type="button" class="remove" onclick="removeField(${index})">-</button>
    `;

    fieldsContainer.appendChild(fieldDiv);
  });
}

function renderList() {
  const others = document.querySelector("#list");

  others.innerHTML = ''

  guest.forEach((field, index) => {
    others.innerHTML += `
      <div class='guest'>
        <p>Nome: ${field.name}</p>
        <p>Idade: ${field.age}</p>
        <p>Comentario: ${field.comment}</p>
        
        <img class="icon-edit" src="./assets/pen.png" onclick="editList(${field.id, index})"/>
        
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

  fields = [{ name: "", age: "", bond: "" }];
  clearForm();
}

function clearForm() {
  participantName.value = "";
  age.value = "";
  comment.value = "";
  checkbox.checked = false;
  fieldsContainer.innerHTML = "";
}

function sendForm() {
  guest.push({
    id: Math.random(),
    name: participantName.value,
    age: age.value,
    comment: comment.value,
    others: fields,
  });
  renderList();
}

function saveModificationsInList() {
    guest[currentItemIndex].name = participantName.value
    guest[currentItemIndex].age = age.value
    guest[currentItemIndex].comment = comment.value
    guest[currentItemIndex].others = fields

    participantName.value = ''
    age.value = ''
    comment.value = ''

    buttonRegister.style.display = 'initial'
    buttonSave.style.display = 'none'

    renderList()
}

function editList(index) {
  currentItemIndex = index
  buttonRegister.style.display = 'none'
  buttonSave.style.display = 'initial'

  participantName.value = guest[index].name
  age.value = guest[index].age
  comment.value = guest[index].comment

  guest[index].others.forEach((field, index) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.className = "others-inputs";

    fieldDiv.innerHTML = `
      <input class="input-02" type="text" placeholder="Nome" value="${field.name}" onchange="updateField(${index}, 'name', this.value)" />
      <input class="input-02" type="number" placeholder="Idade" value="${field.age}" onchange="updateField(${index}, 'age', this.value)" />
      <input class="input-02" type="text" placeholder="Vínculo Ex.: Filho, Neto, Esposo(a)" value="${field.bond}" onchange="updateField(${index}, 'bond', this.value)" />
      <button type="button" class="remove" onclick="removeField(${index})">-</button>
    `;

    fieldsContainer.appendChild(fieldDiv);
  });

  fields = guest[index].others
}

renderFields();
