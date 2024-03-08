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

function editPetClickHandler(editButton) {
  const petElement = editButton.parentElement.parentElement;
  // const pet = pets[petElement.id];

  popupTitle.innerText = "Editar PetAmigo";
  addPetButton.innerText = "Salvar PetAmigo";
  addPetButton.onclick = () => editPetPopupClickHandler(petElement.id);

  showNewPetPopup();
}

function addNewPetClickHandler() {
  popupTitle.innerText = "Adicionar PetAmigo";

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

function findPetIndexByPetId(petId) {
  return pets.indexOf(pets.find((pet) => pet.id == petId));
}

function editPetPopupClickHandler(petElementId) {
  const { name, owner_contact, type } = getPetFromInputs();
  const petIndex = findPetIndexByPetId(petElementId);
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

function addPetPopupClickHandler() {
  const pet = getPetFromInputs();

  const petElement = createPetElement(pet);
  const petId = "pet" + Date.now(); //Garante um id unico com base no tempo

  petElement.id = petId;
  pet.id = petId;
  pet.element = petElement;

  pets.push(pet);

  petList.appendChild(petElement);

  console.log(pets);
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
  console.log("hide");
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
addPetMobileButton.addEventListener("click", addNewPetClickHandler);

const addPetDesktopButton = document.getElementById("add-pet-desktop-button");
addPetButton.addEventListener("click", addNewPetClickHandler);
