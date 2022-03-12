// Created new pokemonRepository variable to hold what IIFE returns. Assigned IIFE to variable.
let pokemonRepository = (function () {
  let pokemonList = [];
  // Added API-URL
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');


  // Adds Pokemon
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Returns pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Finds Pokemon by name
  function findPokemon(searchName){
    // Clear the all the buttons on the page when user types in search box
    $('.pokemon-list').empty();


    // Adds pokemon
    pokemonList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())){
        addListItem(pokemon);
      }
    })
  }

  /* Loads list of Pokemon: Fetches details from API, then adds each Pokemon in
  fetched data to pokemonList with the add function implemented earlier */
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Loads detailed data for a given Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {

      // Adds details to the Pokemon:
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function addListItem(pokemon) {
    let listGroupElement = document.querySelector('.pokemon-list');
    // Creates li-element
    let listItemButton = document.createElement('button');
    // Sets buttons inner text to be the Pokemon's name
    listItemButton.innerText = pokemon.name;
    // Adds a class to the button, which is targeted by CSS rule

    listItemButton.classList.add('list-group-item', 'list-group-item-action',
    'text-center', 'text-uppercase');
    // Adds the data toggle and data target to trigger the modal
    listItemButton.setAttribute('data-toggle', 'modal');
    listItemButton.setAttribute('data-target', '#modal-container');
    // Appends the button to  parent div element
    listGroupElement.appendChild(listItemButton);

  // Adds an event listener
  buttonEventListener(listItemButton, pokemon);
}
// function adds event listener to a button to show Pokemons details when the button is clicked
function buttonEventListener(button, pokemon){
  button.addEventListener('click', function(){
    showDetails(pokemon);
  });
}

// Existing showDetails function executes loadDetails
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

// Modal:
function showModal(pokemon) {
  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let pokemonName = document.createElement('h1');
  pokemonName.innerText = pokemon.name;

  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = 'Height: ' + pokemon.height;

  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-modal-image');
  pokemonImage.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonImage);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal container,
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

// Return key-value-pairs
return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
  showModal();
});
}
