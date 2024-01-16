const pokeAPI = {}

function convertToPokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
  }

pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((res) => res.json())
    .then(convertToPokeApiToPokemon);
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((err) => console.log(`ERRO: ${err}`))
}