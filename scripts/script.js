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
        <button>edit</button>
        <button onclick="removePetClickHandler(this)">delete</button>
      </div>`;

  return petElement;
}

function removePetClickHandler(deleteButton) {
  const petElement = deleteButton.parentElement.parentElement;
  petList.removeChild(petElement);
  pets.slice(petElement.id);
}

function addPetClickHandler() {
  const pet = {
    name: petNameInput.value,
    owner_contact: petOwnerContactInput.value,
    type: petTypeSelect.value,
  };

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
addPetButton.onclick = addPetClickHandler;
