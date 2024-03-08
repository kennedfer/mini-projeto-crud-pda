function createPetElement(pet) {
  const { name, owner_contact, type } = pet;

  const petElement = document.createElement("div");
  petElement.innerHTML = `
    <li class="pet-list__pet-item">
      <div class="pet-item__infos">
        <span>${name}</span>
        <span>${owner_contact}</span>
        <span>${type}</span>
      </div>
      <div class="pet-item__mod-buttons">
        <button>edit</button>
        <button>delete</button>
      </div>
    </li>`;

  return petElement;
}

function addPetClickHandler() {
  const pet = {
    name: petNameInput.value,
    owner_contact: petOwnerContactInput.value,
    type: petTypeSelect.value,
  };

  const petElement = createPetElement(pet);
  petList.appendChild(petElement);
}

const petList = document.getElementById("pet-list");

const petNameInput = document.getElementById("new-pet-popup__name");
const petOwnerContactInput = document.getElementById(
  "new-pet-popup__owner-contact"
);
const petTypeSelect = document.getElementById("new-pet-popup__type");

const addPetButton = document.getElementById("new-pet-popup__add-pet");
addPetButton.onclick = addPetClickHandler;
