// This funktion adds display:none to the Startscreen if the button got pressed.
function openPokedex() {
    document.getElementById('startScreen').style = 'display:none';
    document.getElementById('poke_container').classList.add('d-flex')
    document.getElementById('title').style = 'display:flex'
    document.getElementById('search-field').classList.remove('d-none');

}


function disableAll() {
    document.getElementById('title').style = 'display:none'
    document.getElementById('poke_container').style = 'display:none';

}

let allPokemons = [];
let currentPokemon;

async function loadPokemon() {

    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);


    for (let i = 0; i < currentPokemon.results.length; i++) {
        let allPokemon = await getUrl(currentPokemon['results'][i]['url'])
        allPokemons.push(allPokemon);

        ;

    }

    showAllPokemon(allPokemons);
    console.log(allPokemons)
    renderPokemon(allPokemons)
}

function showAllPokemon(_pokemon) {

}
async function getUrl(url) {
    let response = await fetch(url);
    let pokemons = await response.json();
    return pokemons;
}


function renderPokemon(pokemons) {      // Shows Pokemon Cards 
    let content = document.getElementById('poke_container');
    
    content.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
        const allPokemons = pokemons[i];
        let pokemonImg = allPokemons['sprites']['other']['official-artwork']['front_default'];
        let type = allPokemons['types'][0]['type']['name'];
        content.innerHTML += `
            <div id="poke-container${allPokemons.id}"  onclick="openPokeInfo(${allPokemons.id})" class="pokemon">          
                <h1 class="name">${allPokemons.name}</h1>
                <img class="poke-img" src="${pokemonImg}">
                <div id="pokemontype" class="card-type">
                    ${type}
                </div> 
                </div>
                <p class="poke-id">#${allPokemons.id}</p>
                </div>
            </div>
            `;
            document.getElementById('poke-container' + allPokemons.id).classList.add(allPokemons.types[0].type.name);
            // addTypes(allPokemons[i]);
            
    }
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
        renderPokemon(searchResult);

    }
    document.getElementById('result').classList.add('d-none');

}



async function getPokemonById(id){
    let find = allPokemons.find(p => p.id === id);
    if(find){
        return find;
    }else{
        return await fetchPokemonById(id);
    }
}

async function fetchPokemonById(id){
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    allPokemons.push(pokemon);
    return pokemon;
}
 

 async function openPokeInfo(id) {       // Opens Window with Informations
    let pokemon = await getPokemonById(id);
    document.getElementById('pokeWindow').style.display = 'flex';

    let content = document.getElementById('pokeWindow');
    content.innerHTML = "";
    let pokemonImg = pokemon['sprites']['other']['official-artwork']['front_default'];    
    content.innerHTML += `
    <div id="poke-view"class="poke-view">
        <div id="overview${id}"class="overview">
        <h1 class="view-name">${pokemon.name}</h1>
        <img class="view-img" src="${pokemonImg}">    
        <button class="close-view" onclick="closeView()">X</button>
        </div>
        <div class="navigation">
        <div class="pokemon-info">
        <div onclick='showAbout(${JSON.stringify(pokemon)})' class="about">about</div>
        <div onclick='showAbilities(${JSON.stringify(pokemon)})' class="ability-container ">Abilities</div>
        <div onclick='showStats(${JSON.stringify(pokemon)})' class="s">Stats</div>
        <div onclick='showMoves(${JSON.stringify(pokemon)})' id="moves">moves</div>
        </div></div>
        <div id="show" class="show"></div>
        </div>
        `;
        document.getElementById('overview' + id).classList.add(pokemon.types[0].type.name);

}






// function addTypes(allPokemons) {
//     for (let i = 0; i < allPokemons['types'].length; i++) {

//         let PokeType = allPokemons['types'][i]['type']['name'];

//         document.getElementById('type' + allPokemons[i]).innerHTML +=
//             `<div class="types">${PokeType}</div>`;

//     }

// }




function showAbout(pokemon) {
    document.getElementById('show').innerHTML = "";
    document.getElementById('show').innerHTML = `
    <div id="about" class="">
    <p>Species:</p> <p> ${pokemon.species.name}</p>     
    <p>Weight:</p> <p> ${pokemon.weight}</p>
    </div>
    `
}

function showAbilities(pokemon) {
    document.getElementById('show').innerHTML = "";
    for (let k = 0; k < pokemon.abilities.length; k++) {
        const abilities = pokemon.abilities[k];
        document.getElementById('show').innerHTML += `
       <div id="abilities${k}" class="ability">
        ${abilities.ability.name}
       </div>
       
       `

    }
}

function showStats(pokemon) {
    document.getElementById('show').innerHTML = ``;

    for (let m = 0; m < pokemon['stats'].length; m++) {

        let progress = pokemon['stats'][m]['base_stat'];
        let skillname = pokemon['stats'][m]['stat']['name'];

        document.getElementById('show').innerHTML += `<div class="stats">
        <div class="skill-name">${skillname}: </div>
        <div class="progress"><div class="progress-bar ${skillname}" role="progressbar" 
        style="width: ${progress}%">${progress}</div>
        </div></div>`;

    }
}

function showMoves(pokemon) {
    document.getElementById('show').innerHTML = "";
    for (let l = 0; l < pokemon.moves.length; l++) {
        const moves = pokemon.moves[l].move.name;

        document.getElementById('show').innerHTML += 
        `<div class="moves" id="moves${l}">${moves}</div>   `
        
    }
   
}


function closeView() {
    document.getElementById('pokeWindow').style.display = 'none';
    document.getElementById('poke_container').style = 'display:flex'
    document.getElementById('title').style = 'display:flex'

}