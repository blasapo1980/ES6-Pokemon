'use strict';
const baseURL = 'http://pokeapi.co/api/v2/';
const pokemonURL = num => `${baseURL}pokemon/${num}/`;
const number = 7;

fetch(pokemonURL(number))
.then(response1 =>
  response1.json()
)
.then(json1 => {
  const pokemon = {
    name: json1.name,
    id: json1.id,
    image: json1.sprites.front_default
  };
  fetch(json1.species.url)
  .then(response2 =>
    response2.json()
  )
  .then(json2 => {
    if (json2.evolves_from_species !== null) {
      pokemon.evolve = json2.evolves_from_species.name;
    } else {
      pokemon.evolve = 'Es un bebito';
    }
    paint(pokemon);
  });
});

const paint = pokemonData => {
  const results = document.querySelector('.pokemon-list');
  const {
    name,
    id,
    image,
    evolve
  } = pokemonData;

  results.innerHTML = `
    <span class="card">
    <p>${id}</p>
    <p>${name}</p>
    <p>${evolve}</p>
    <img src="${image}" />
    </span>
    `;
}
