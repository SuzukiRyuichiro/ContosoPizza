const uri = "api/Pizza";
let pizzas = [];

function getItems() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error("Unable to get items.", error));
}

function addItem() {
  const addNameTextbox = document.getElementById("add-name");

  const item = {
    isGlutenFree: false,
    name: addNameTextbox.value.trim(),
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
  const item = pizzas.find((item) => item.id === id);

  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-id").value = item.id;
  document.getElementById("edit-isGlutenFree").checked = item.isGlutenFree;
  document.getElementById("editForm").style.display = "block";
}

function updateItem() {
  const itemId = document.getElementById("edit-id").value;
  const item = {
    id: parseInt(itemId, 10),
    isGlutenFree: document.getElementById("edit-isGlutenFree").checked,
    name: document.getElementById("edit-name").value.trim(),
  };

  fetch(`${uri}/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to update item.", error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById("editForm").style.display = "none";
}

function _displayCount(itemCount) {
  const name = itemCount === 1 ? "pizza" : "pizzas";

  document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById("pizzas");
  tBody.innerHTML = "";

  _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    let isGlutenFreeCheckbox = document.createElement("p");
    isGlutenFreeCheckbox.innerText = item.isGlutenFree ? "Yes" : "No";

    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute("class", "btn-primary");
    editButton.setAttribute("onclick", `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("class", "btn-danger");
    deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    td1.setAttribute("class", "border border-slate-300");
    td1.appendChild(isGlutenFreeCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.setAttribute("class", "border border-slate-300");
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.setAttribute("class", "border border-slate-300");
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.setAttribute("class", "border border-slate-300");
    td4.appendChild(deleteButton);
  });

  pizzas = data;
}
