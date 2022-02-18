// Created new pokemonRepository variable to hold what IIFE returns. Assigned IIFE to variable
let pokemonRepository = (function () {
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 2.04,
    type: ['grass','poison']
  },
  {
    name: "Ivysaur",
    height: 3.03,
    type: ['grass','poison']
  },
  {
    name: "Venusaur",
    height: 6.07,
    type: ['grass','poison']
  },
  {
    name: "Charmander",
    height: 2.00,
    type: 'fire'
  }
];

// Returns pokemonList array
function getAll() {
  return pokemonList;
}

// Adds Pokemon
function add(item) {
  pokemonList.push({name: 'Pikachu'});
}

// Funtion represents a single pokemon
function addListItem(pokemon) {
let variable = document.querySelector('.pokemon-list');
// Creates li-element
let listItem = document.createElement('li');
// Creates button-element
let button = document.createElement('button');
// Sets buttons inner text to be the pokemon's name
button.innerText = pokemon.name;
// Adds a class to the button, which is targeted by CSS rule
button.classList.add('poke-button');
// Appends the button to the list item as its child
listItem.appendChild(button);
// Appends the list item to the ul as its child
variable.appendChild(listItem);
/* As for the event handler function: calls showDetails function,
passing pokemon object as parameter when Pokémon is clicked. */
button.addEventListener('click', function(event) {
  showDetails(pokemon);
});
}

// Return key-value-pairs
return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };

})();

pokemonRepository.add('Pikachu');

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

function showDetails(pokemon) {
  console.log(pokemon.name);
}
