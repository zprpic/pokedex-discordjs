const { MessageEmbed } = require("discord.js");

module.exports = function formatMessage(data) {
  let message;
  if (data.name === "Error") {
    message = new MessageEmbed(data).setTitle(`Pokemon not found`);
  } else {
    message = new MessageEmbed(data)
      .setTitle(`Name: ${data.name}`)
      .setDescription(`Type(s): ${data.types.toString()}`)
      .setAuthor(
        "Click for more info",
        "",
        `https://bulbapedia.bulbagarden.net/wiki/${data.name}_(Pok%C3%A9mon)`
      )
      .setImage(data.image);
  }
  return message;
};
