const _ = require('lodash');
const config = require('./config/config');
const discord = require('discord.js');
const db = require('./modules/dbcontroller');
const fs = require('fs-extra');
const reactions = require('./modules/reactions');

const client = new discord.Client();

// Read all the commands and put them into the client
fs.readdir(`${__dirname}/commands/`).then((files) => {
  const commands = [];
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const command = require(`${__dirname}/commands/${file}`);
      commands.push(command);
    }
  });

  client.commands = commands;
});

// Initialize the database if it is fresh.
db.initDatabase();

client.on('ready', () => {
  /*
  Add the guild to the database if its not already in.
  This is when the database resets, but the bot still remains
  in the guild.
  */
  const guilds = client.guilds.array();
  guilds.forEach(async (guild) => {
    if (!db.guildExists(guild)) {
      const owner = await client.fetchUser(guild.ownerID);
      db.addGuild(guild);
      db.addManager(guild, owner);
    }
  });

  console.log('This bot has started.');
  client.user.setGame(`${config.prefix}help`);
  client.help = [];
});

// When a guild adds the bot, add it to the db
client.on('guildCreate', async (guild) => {
  console.log('Added to new server!');
  if (!db.guildExists(guild)) {
    const owner = await client.fetchUser(guild.ownerID);
    db.addGuild(guild);
    db.addManager(guild, owner);
  }
});

// Handle all messages inside of guilds
client.on('message', (message) => {
  // Handle all DMs
  if (message.channel.type === 'dm') return;

  // Do not listen to messages that are made by a bot
  if (message.author.bot) return;

  // Do not listen if the command doesnt start with the specified prefix
  if (message.content.slice(0, config.prefix.length) !== config.prefix) return;

  const command = message.content.split(' ')[0].slice(config.prefix.length).toLowerCase();

  // Dont run the command if it isnt valid.
  if (!client.commands.some(elem => elem.name === command)) return;

  // Check perms
  if (db.commandIsDisabled(message.guild, command) && !db.userIsManager(message.guild, message.author)) {
    message.react(reactions.restricted);
    message.channel.send('You do not have permission for this command.').then((msg) => {
      msg.delete(5000);
    });
    return;
  }

  // +1 for the space after the command
  let args = message.content.slice(config.prefix.length + command.length + 1);
  args = _.trim(args);

  try {
    const indexOfCommand = _.findIndex(client.commands, { name: command });
    client.commands[indexOfCommand].run(client, message, args);
  } catch (err) {
    message.react(reactions.debug);
    message.channel.send(`The bot ran into an unexpected error. Fix this shit: ${err.message}`);
  }
});

client.login(config.token);
