const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = require("./config/config");
const { Constants, Client, Intents } = require("discord.js");

const getPokemon = require("./getPokemon");
const formatPokemonData = require("./formatPokemonData");
const formatMessage = require("./formatMessage");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guild = client.guilds.cache.get(GUILD_ID);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.applications?.commands;
  }

  commands?.create({
    name: "pokemon",
    description: "gets Pokémon data",
    options: [
      {
        name: "name",
        description: "GO!",
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "pokemon") {
    const { value: name } = options._hoistedOptions[0];

    const unformattedPokemon = await getPokemon(name);

    if (unformattedPokemon) {
      const formattedPokemonData = formatPokemonData(unformattedPokemon);

      const formattedMessage = formatMessage(formattedPokemonData);

      interaction.reply({
        embeds: [formattedMessage],
      });
    }
  }
});

client.login(DISCORD_TOKEN);
