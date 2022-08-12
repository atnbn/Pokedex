let allPokemons = [];
/**
 * This function loads 50 Pokemons by url and pushs them in the array named allPokemons
 */
async function load50Pokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';
    let response = await fetch(url);
    let pokemonList = await response.json();
    console.log('loaded Pokemon', pokemonList);


    for (let i = 0; i < pokemonList['results'].length; i++) {
        let currentPokemon = await getPokemonByUrl(pokemonList['results'][i]['url']);
        allPokemons.push(currentPokemon);


    }
    showPokemonCards(allPokemons);
}
/**
 * This function shows the small cards on the startscreen 
 * @param {*} pokemons 
 */
function showPokemonCards(pokemons) {

    document.getElementById('content').innerHTML = "";
    for (let j = 0; j < pokemons.length; j++) {
        let pokemonImg = pokemons[j]['sprites']['other']['official-artwork']['front_default'];
        let type = pokemons[j]['types'][0]['type']['name'];
        document.getElementById('content').innerHTML +=
            `<div class="pokemon-card ${type}" onclick='showPokemon(${JSON.stringify(pokemons[j])})'><span class="name">${pokemons[j]['name']}</span>
            <img src="${pokemonImg}"class="pokeimage">
            <div class="types-container"id="types${pokemons[i].name}"></div>
            </div>`;

            
    }

}


async function getPokemonByUrl(url) {

    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
}



function searchPokemonNames() {


    let search = document.getElementById('search-field').value;
    search = search.toLowerCase();

    let result = document.getElementById('result');
    result.innerHTML = '';
    document.getElementById('result').classList.remove('d-none');
    let searchResult = allPokemons.filter(pokemon => pokemon.name.includes(search));

    if (searchResult.length == 0) {
        alert('No Pokemon found!');

    } else {
        showPokemonCards(searchResult);

    }
    document.getElementById('result').classList.add('d-none');

}


function showPokemon(currentPokemon) {

    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let type = currentPokemon['types'][0]['type']['name'];

    document.getElementById('aboutPokemon').innerHTML =
        `<div class="${type} name-container"><div class="close" onclick="showCards()">X</div><span class="name-bold">${currentPokemon['name']}</span>
        <div id="types"></div>
        <div class="img-container">
        <img src =${pokemonImg} class="pokemonImage"></div>
           </div>
           <div class="navigation"id="nav">
           <div onclick='showAbout(${JSON.stringify(currentPokemon)})' id="about">about</div>
           <div onclick='showAbilities(${JSON.stringify(currentPokemon)})' id="abilities">abilities</div>
           <div onclick='showMoves(${JSON.stringify(currentPokemon)})' id="moves">moves</div>
           <div onclick='showStats(${JSON.stringify(currentPokemon)})' id="stats">stats</div>
       </div>
       <div class="infocontainer"></div>`;

    hideCards();
    showAbout(currentPokemon);
    addTypes(currentPokemon);

    document.getElementById('search').classList.add('d-none');
    document.getElementById('bg').classList.add('d-none');
    document.getElementById('bg-img').classList.add('d-none');
}




function hideCards() {
    document.getElementById('content').classList.add('d-none');
    document.getElementById('aboutPokemon').classList.remove('d-none');
    document.getElementById('info').classList.remove('d-none');
    document.getElementById('info-title').classList.remove('d-none');
}


function showCards() {
    document.getElementById('content').classList.remove('d-none');
    document.getElementById('search').classList.remove('d-none');
    document.getElementById('bg').classList.remove('d-none');
    document.getElementById('bg-img').classList.remove('d-none');
    document.getElementById('aboutPokemon').classList.add('d-none');
    document.getElementById('info').classList.add('d-none');
    document.getElementById('info-title').classList.add('d-none');
    document.getElementById('result').classList.add('d-none');
}


function showAbout(currentPokemon) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    let species = currentPokemon['species']['name']
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    document.getElementById('info').innerHTML = `<table>
    <tr>
    <td class="title">Species:</td>
    <td>${species}</td>
  </tr>
    <tr>
      <td class="title">Height:</td>
      <td>${height}</td>
    </tr>
    <tr>
      <td class="title">Weight:</td>
      <td>${weight}</td>
    </tr>
    </table>`;

    activeLinkAbout();
}


function showAbilities(currentPokemon) {
    document.getElementById('info-title').innerHTML = ``;
    document.getElementById('info').innerHTML = ``;

    for (let k = 0; k < currentPokemon['abilities'].length; k++) {

        let ability = currentPokemon['abilities'][k]['ability']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Abilities</div>`;
        document.getElementById('info').innerHTML += `<div class="d-flex-center">${ability}</div>`;

        activeLinkAbilities();
    }
}


function showMoves(currentPokemon) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    for (let l = 0; l < currentPokemon['moves'].length; l++) {

        let move = currentPokemon['moves'][l]['move']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Moves</div>`;
        document.getElementById('info').innerHTML += `<div class="d-flex-center">${move}</div>`;

        activeLinkMoves();
    }
}


function showStats(allPokemons) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    for (let m = 0; m < allPokemons['stats'].length; m++) {

        let progress = allPokemons['stats'][m]['base_stat'];
        let skillname = allPokemons['stats'][m]['stat']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Stats</div>`;

        document.getElementById('info').innerHTML += `<div class="stats">
        <div class="skill-name">${skillname}</div>
        <div class="progress"><div class="progress-bar ${skillname}" role="progressbar" 
  style="width: ${progress}%" aria-valuemin="0" aria-valuemax="260">${progress}</div>
</div></div>`;

        activeLinkStats();
    }
}

function addTypes(allPokemons) {
    for (let n = 0; n < allPokemons['types'].length; n++) {

        let PokeType = allPokemons['types'][n]['type']['name'];

        document.getElementById('types').innerHTML += `<div class="bg-type">${PokeType}</div>`;

    }
}

function addTypesSmallCards(currentPokemon) {
    for (let o = 0; o < currentPokemon['types'].length; o++) {

        let PokeType = currentPokemon['types'][o]['type']['name'];

        document.getElementById('types' + currentPokemon['name']).innerHTML +=
            `<div class="cardtype">${PokeType}</div>`;

    }

}


function activeLinkAbout() {
    document.getElementById('about').classList.add('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkAbilities() {
    document.getElementById('abilities').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkMoves() {
    document.getElementById('moves').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkStats() {
    document.getElementById('stats').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
}