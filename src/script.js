const fieldsContainer = document.querySelector("#fields-container");
const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const comment = document.querySelector("#comentario");
const checkbox = document.querySelector("#checkbox");
const list = document.querySelector("#list");

let fields = [{ name: "", age: "", bond: "" }];
const guest = [];

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

  guest.push({
    name: nome.value,
    age: idade.value,
    comment: comment.value,
    others: fields,
  });

  guest.forEach((field) => {
    others.innerHTML += `
      <div class='guest'>
        <p>Nome: ${field.name}</p>
        <p>Idade: ${field.age}</p>
        <p>Comentario: ${field.comment}</p>
        
        <div class="separator"></div>
  
        ${field.others.map((otherField) => `
          <div>
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
  console.log(guest);
}

function clearForm() {
  nome.value = "";
  idade.value = "";
  comment.value = "";
  checkbox.checked = false;
  fieldsContainer.innerHTML = "";
}

function sendForm() {
  renderList();
}

renderFields();
