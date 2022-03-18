const pokeCard = document.querySelector('[data-pokecard]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const form = document.querySelector('.form');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = async (e)=> {
    e.preventDefault();
    const {value} = e.target.pokemon;
    try {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
    } catch (error) {
        renderNotFound();
    }
}

const renderNotFound = ()=> {
    pokeName.textContent = 'Pokemon no encontrado';
    pokeImg.src = 'img/poke-silueta.png';
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

const renderPokemonData = (data)=> {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokeImg.src = `${sprite}`;
    pokeId.textContent = `N° ${data.id}`
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

form.addEventListener('submit', searchPokemon);

const setCardColor = (types)=> {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = (types) => {
    pokeTypes.innerHTML = '';

    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = (stats)=> {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');

        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);

        pokeStats.appendChild(statElement);
    })

}