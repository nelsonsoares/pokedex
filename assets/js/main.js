const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
          </li>`
}

function loadPokemonItens(offset, limit) {  
  pokeAPI.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('');
      pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordWithNextPage = offset + limit;

  if(qtdRecordWithNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    
    loadMoreButton.parentElement.remove(loadMoreButton);

  } else {
    loadPokemonItens(offset, limit);
  }

});