function createPetElement(pet) {
  const { name, owner_contact, type } = pet;

  const petElement = document.createElement("li");
  petElement.className = "pet-list__pet-item";
  petElement.innerHTML = `
      <div class="pet-item__infos">
        <span>${name}</span>
        <span class="infos__light-text" >${owner_contact}</span>
        <span class="infos__light-text">${type}</span>
      </div>
      <div class="pet-item__mod-buttons">
        <button class="button   is-info" onclick="editPetClickHandler(this)">Editar</button>
        <button class="button   is-danger" onclick="removePetClickHandler(this)">Deletar</button>
      </div>`;

  return petElement;
}

function findPetIndexByPetId(petId) {
  return pets.indexOf(pets.find((pet) => pet.id == petId));
}

function editPetClickHandler(editButton) {
  const petElement = editButton.parentElement.parentElement;

  const petIndex = findPetIndexByPetId(petElement.id);
  const pet = pets[petIndex];

  petNameInput.value = pet.name;
  petOwnerContactInput.value = pet.owner_contact;
  petTypeSelect.value = pet.type;

  popupTitle.innerText = "Editar PetAmigo";
  addPetButton.innerText = "Salvar PetAmigo";
  addPetButton.onclick = () => editPetPopupClickHandler(petIndex);

  showNewPetPopup();
}

function addNewPetClickHandler() {
  popupTitle.innerText = "Adicionar PetAmigo";

  petNameInput.value = "";
  petOwnerContactInput.value = "";
  petTypeSelect.value = "Cachorro";

  addPetButton.innerText = "Adicionar PetAmigo";
  addPetButton.onclick = addPetPopupClickHandler;

  showNewPetPopup();
}

function removePetClickHandler(deleteButton) {
  const canDelete = confirm("O pet será removido, tem certeza?");

  if (canDelete) {
    const petElement = deleteButton.parentElement.parentElement;
    petList.removeChild(petElement);
    pets.splice(petElement.id, 1);
  }
}

function getPetFromInputs() {
  return {
    name: petNameInput.value,
    owner_contact: petOwnerContactInput.value,
    type: petTypeSelect.value,
  };
}

function editPetPopupClickHandler(petIndex) {
  if (hasBlankInputs()) return alert("Todos os campos são OBRIGATÓRIOS!");

  const { name, owner_contact, type } = getPetFromInputs();

  const petElement = pets[petIndex].element;
  const petInfos = petElement.children.item(0).children;

  petInfos.item(0).innerText = name;
  petInfos.item(1).innerText = owner_contact;
  petInfos.item(2).innerText = type;

  pets[petIndex] = {
    name,
    owner_contact,
    type,
    id: pets[petIndex].id,
    element: petElement,
  };

  hideNewPetPopup();
}

function hasBlankInputs() {
  return (
    !petNameInput.value || !petOwnerContactInput.value || !petTypeSelect.value
  );
}

function addPetPopupClickHandler() {
  if (hasBlankInputs()) return alert("Todos os campos são OBRIGATÓRIOS!");

  const pet = getPetFromInputs();

  const petElement = createPetElement(pet);
  const petId = "pet" + Date.now();

  petElement.id = petId;
  pet.id = petId;
  pet.element = petElement;

  pets.push(pet);

  petList.appendChild(petElement);

  hideNewPetPopup();
}

function resetElementAnimation(element) {
  element.style.offsetHeight;
}

function showNewPetPopup() {
  newPetPopup.style.display = "grid";

  newPetPopup.style.animation = "show-popup .25s forwards";
  resetElementAnimation(newPetPopup);
}

function hideNewPetPopup() {
  newPetPopup.style.animation = "hide-popup .25s forwards";
  resetElementAnimation(newPetPopup);

  setTimeout(() => (newPetPopup.style.display = "none"), 250);
}

const pets = [];
const petList = document.getElementById("pet-list");

const petNameInput = document.getElementById("new-pet-popup__name");
const petOwnerContactInput = document.getElementById(
  "new-pet-popup__owner-contact"
);
const petTypeSelect = document.getElementById("new-pet-popup__type");

const addPetButton = document.getElementById("new-pet-popup__add-pet");
addPetButton.onclick = addPetPopupClickHandler;

const newPetPopup = document.getElementById("new-pet-popup");
const popupTitle = newPetPopup.children.item(0);

const addPetMobileButton = document.getElementById("add-pet-mobile-button");
addPetMobileButton.onclick, addNewPetClickHandler;

const addPetDesktopButton = document.getElementById("add-pet-desktop-button");
addPetButton.onclick, addNewPetClickHandler;
