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

// Return key-value-pairs
return {
    add: add,
    getAll: getAll,
  };

})();

pokemonRepository.add('Pikachu');

// 'forEach' loop instead of 'for' function. Used .getAll in order to retrieve pokemonList inside IIFE.
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ' height : ' + pokemon.height + '<br>');
});
