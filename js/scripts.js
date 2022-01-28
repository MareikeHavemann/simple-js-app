let pokemonList = [
  {
    name: "Bulbasaur",
    height: 2.04,
    type: ["grass","poison"]
  },
  {
    name: "Ivysaur",
    height: 3.03,
    type: ["grass","poison"]
  },
  {
    name: "Venusaur",
    height: 6.07,
    type: ["grass","poison"]
  },
  {
    name: "Charmander",
    height: 2.00,
    type: "fire"
  }
];

// Conditional checks if height > 5
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5) {
    document.write(pokemonList[i].name + ( ', height: ' ) + pokemonList[i].height + " - Wow, that\'s big!" + '<br>');  }
    else {
      document.write(pokemonList[i].name + ( ', height: ' ) + pokemonList[i].height + '<br>');
    }
  }
