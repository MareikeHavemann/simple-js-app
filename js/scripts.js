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
        // Now adding details to the item:
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // Existing showDetails function executes loadDetails
        function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
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
