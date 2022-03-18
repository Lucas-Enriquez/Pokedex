const gridContainer = document.querySelector("[data-pokegrid-container]");
const templateCard = document.getElementById("template-card").content;
const templateStats = document.getElementById("template-stats").content;
const fragment = document.createDocumentFragment();
const spinner = document.querySelector(".sk-fading-circle");
const statsParent = document.querySelector(".stats-parent-container");

let pokemon = {};

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

let offset = 1;
let limit = 23;

async function fetchPokemons(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const rest = await fetch(url);
  const pokemon = await rest.json();
  crearPokemon(pokemon);
  spinner.style.display = "none";
}

async function recorrerPokemon(offset, limit) {
  spinner.style.display = "block";

  for (let i = offset; i <= offset + limit; i++) {
    await fetchPokemons(i);
  }
}

async function crearPokemon(pokemon) {
  const { id, name } = pokemon;

  templateCard.querySelector("[data-poke-id]").textContent = `#${id}`;
  templateCard.querySelector("[data-poke-card-container]").dataset.id = `${id}`;
  templateCard.querySelector("[data-poke-img-container]").dataset.id = `${id}`;
  templateCard.querySelector("[data-poke-name]").textContent =
    name.charAt(0).toUpperCase() + name.slice(1);
  templateCard.querySelector("[data-poke-img]").src =
    pokemon.sprites.front_default;

  const colorOne = typeColors[pokemon.types[0].type.name];
  templateCard.querySelector(
    "[data-poke-img]"
  ).style.background = `${colorOne}`;

  const clone = templateCard.cloneNode(true);
  fragment.appendChild(clone);

  gridContainer.appendChild(fragment);
}

// MOSTRAR ESTADÍSTICAS

gridContainer.addEventListener("click", (e) => {
  const eventClass = e.target.classList;
  if (eventClass.contains("poke-card-container") || eventClass.contains("poke-img-container")) {
    addPokemon(e.target);
  }
});

document.addEventListener('click', (e)=> {
  if(e.target.classList.contains('fa-xmark')) {
    console.log('has dao clic');

    const statsContainer = document.querySelector(".stats-container");
    statsContainer.remove();
  }
})

async function addPokemon(e) {
  // console.log(e.dataset.id);
  const id = e.dataset.id;
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const rest = await fetch(url);
    const pokemon = await rest.json();
    await showStats(pokemon);
    spinner.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

async function showStats(pokemon) {
  const pokeStatsDiv = templateStats.querySelector("[data-poke-stats-div]");
  pokeStatsDiv.innerHTML = "";
  const statsContainer = document.querySelector(".stats-container");

  if (statsContainer) {
    statsContainer.remove();
  }
  const { name } = pokemon;



  if (pokemon.types[1]) {
    templateStats.querySelector(
      "span"
    ).textContent = `Tipo: ${pokemon.types[0].type.name}, ${pokemon.types[1].type.name}`;
  } else if (pokemon.types[0]) {
    templateStats.querySelector(
      "span"
    ).textContent = `Tipo: ${pokemon.types[0].type.name}`;
  }

  templateStats.querySelector("img").src = `${pokemon.sprites.front_default}`;
  templateStats.querySelector("h5").textContent =
    name.charAt(0).toUpperCase() + name.slice(1);
  pokemon.stats.forEach((stat) => {
    // console.log(stat);

    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStatsDiv.appendChild(statElement);
    // templateStats.querySelectorAll('span')

  });

  const clone = templateStats.cloneNode(true);
  fragment.appendChild(clone);

  gridContainer.appendChild(fragment);
  return;
}

recorrerPokemon(offset, limit);

// Paginacion

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

previous.addEventListener("click", (e) => {
  e.preventDefault();

  if (offset != 1) {
    offset -= 24;
    removeChildNodes(gridContainer);
    recorrerPokemon(offset, limit);
  }
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  removeChildNodes(gridContainer);
  offset += 24;
  recorrerPokemon(offset, limit);
});

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
