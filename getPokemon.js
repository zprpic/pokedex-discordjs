const axios = require("axios");

module.exports = async function getPokemon(name) {
  try {
    const { data: response } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
