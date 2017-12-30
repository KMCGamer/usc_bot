const db = require('../modules/dbcontroller.js');
const config = require('../config/config');
const _ = require('lodash');

// Metadata
module.exports = {
  name: 'enablecommand',
  syntax: `${config.prefix}enablecommand command`,
  description: 'Enable a command',
};

module.exports.run = (client, message, args) => {
  // Support for multiple commands, filter on Boolean removes empty strings.
  const commands = args.split(',').map(arg => _.trim(arg)).filter(Boolean);

  commands.forEach((commandName) => {
    // Return if the command doesnt exist.
    if (!client.commands.some(elem => elem.name === commandName)) {
      message.react('❓');
      message.channel.send(`"${commandName}" is not a valid command.`).then((msg) => {
        msg.delete(5000); // Delete the message five seconds
      });
      return;
    }

    // Check if the command is diasbled
    if (!db.commandIsDisabled(message.guild, commandName)) {
      message.react('❌');
      message.channel.send(`"${commandName}" is already disabled.`).then((msg) => {
        msg.delete(5000); // Delete message after five seconds
      });
      return;
    }

    // Enable the role
    db.removeDisabledCommand(message.guild, commandName);
    message.react('✅');
  });
};
