const { table, getBorderCharacters } = require('table');
const fs = require('fs-extra');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');
const reactions = require('../modules/reactions');

module.exports = {
  name: 'help',
  syntax: `${config.prefix}help`,
  description: 'Displays all commands',
};

module.exports.run = (client, message, args) => {
  const data = [['Command', 'Description', 'Syntax']];

  client.commands.forEach((command) => {
    if (db.commandIsDisabled(message.guild, command.name)) {
      command.name += '*';
    }
    data.push([command.name, command.description, command.syntax]);
  });

  data.pop();
  data.pop();

  const tableConfig = {
    border: getBorderCharacters('norc'),
  };

  const output = table(data, tableConfig);

  // Delete these message after a minute
  message.channel.send(`\`\`\`\n${output}*: These commands are disabled.\`\`\`\n`)
    .then(async (msg) => {
      await msg.react(reactions.one);
      await msg.react(reactions.two);
      await msg.react(reactions.three);
      await msg.react(reactions.four);
      await msg.react('🇽');
      msg.delete(60000);
    })
    .catch(err => console.log(err));
  message.channel.send('__Full commands list__: <https://goo.gl/eFN6wF>').then(msg => msg.delete(60000));
};
