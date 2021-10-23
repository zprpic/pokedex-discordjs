module.exports = function formatPokemonData(unformattedData) {
  let formattedData;
  if (unformattedData.name === "Error") {
    formattedData = unformattedData;
  } else {
    const { name, types, sprites } = unformattedData;

    const formattedTypes = types.map((type) => type.type.name);

    const sprite = sprites.back_default;

    formattedData = { name, types: formattedTypes, image: sprite };
  }
  return formattedData;
};
