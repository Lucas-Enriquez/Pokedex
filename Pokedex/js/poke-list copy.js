const pokeGridContainer = document.querySelector("[data-pokegrid-container]");
console.log(pokeGridContainer)

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((data) => data.json())
    .then((response) => createPokemon(response));
}

function fetchPokemons(number) {
  for (let i = 1; i <= number; i++) {
    fetchPokemon(i);
  }
}

function createPokemon(pokemon) {
  const card = document.createElement("div");
  card.innerHTML = `
    <div data-poke-card-container class="poke-card-container">
            <div class="poke-img-container" data-poke-img-container>
                <img data-poke-img src="${pokemon.sprites.front_default}" width="200px" alt="">
                <div data-poke-description class="poke-description">
                    <span data-poke-id>id: #${pokemon.id}</span>
                    <h5 data-poke-name>${pokemon.name}</h5>
            </div>
    </div>
    `;
  pokeGridContainer.appendChild(card);
}

fetchPokemons(150);