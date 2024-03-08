function createPetElement(pet) {
  const { name, owner_contact, type } = pet;

  const petElement = document.createElement("li");
  petElement.className = "pet-list__pet-item";
  petElement.innerHTML = `
      <div class="pet-item__infos">
        <span>${name}</span>
        <span>${owner_contact}</span>
        <span>${type}</span>
      </div>
      <div class="pet-item__mod-buttons">
        <button onclick="editPetClickHandler(this)">edit</button>
        <button onclick="removePetClickHandler(this)">delete</button>
      </div>`;

  return petElement;
}

function editPetClickHandler(editButton) {
  const petElement = editButton.parentElement.parentElement;
  const pet = pets[petElement.id];

  popupTitle.innerText = "Editar PetAmigo";
  addPetButton.onclick = () => editPetPopupClickHandler(petElement.id);
}

function removePetClickHandler(deleteButton) {
  const petElement = deleteButton.parentElement.parentElement;
  petList.removeChild(petElement);
  pets.slice(petElement.id);
}

function getPetFromInputs() {
  return {
    name: petNameInput.value,
    owner_contact: petOwnerContactInput.value,
    type: petTypeSelect.value,
  };
}

function editPetPopupClickHandler(petId) {
  const { name, owner_contact, type } = getPetFromInputs();
  const petElement = pets[petId].element;
  const petInfos = petElement.children.item(0).children;

  petInfos.item(0).innerText = name;
  petInfos.item(1).innerText = owner_contact;
  petInfos.item(2).innerText = type;

  pets[petId] = {
    name,
    owner_contact,
    type,
    element: petElement,
  };

  console.log(pets);
}

function addPetPopupClickHandler() {
  const pet = getPetFromInputs();

  const petElement = createPetElement(pet);
  petElement.id = pets.length;

  pets.push({
    ...pet,
    element: petElement,
  });

  petList.appendChild(petElement);
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

const popupTitle = document.getElementById("new-pet-popup__title");
