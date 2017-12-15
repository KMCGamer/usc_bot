const config = require('./config.json');
const commands = require('./commands/commands.js');
const discord = require('discord.js');
const fs = require('fs');
const DBController = require('./DBController.js');

const client = new discord.Client();
const commandsList = Object.keys(commands);

db = new DBController();

client.on('ready', () => {
  console.log('This bot has started.');
  client.user.setGame('Online');
});

client.on("guildCreate", (guild) => {
  console.log("Added to new server!");
  db.addServer(guild.id);
});

client.on('message', (message) => {
  // Do not listen to commands that are made by a bot
  if (message.author.bot) return;

  // Do not listen if the command doesnt start with the specified prefix
  if (message.content.slice(0, config.prefix.length) !== config.prefix) return;

  const command = message.content.split(' ')[0].slice(config.prefix.length);

  // Dont run any commands if its invalid.
  if (!commandsList.includes(command)) {
    message.reply('Please enter a valid command.');
    return;
  }

  try {
    // if the command is admin and you are not an admin, dont run the command
    if (commands[command].admin && message.member.highestRole.comparePositionTo(message.guild.roles.find('name', 'Admin')) < 0) {
      message.channel.send('You do not have permission to use this command.');
    } else {
      commands[command].issue(message);
    }
  } catch (err) {
    message.channel.send('The bot ran into an unexpected error. Fix this shit.');
    console.log(err);
  }
});

client.login(config.token);
