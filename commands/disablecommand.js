const db = require('../modules/dbcontroller.js');
const _ = require('lodash');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'disablecommand',
  description: 'Disable a command',
  syntax: `${config.prefix}disablecommand command`,
  help: 'When a command is disabled, it is added to the database and disallows anyone who is not a bot manager access to it.',
  usage: [
    `\`${config.prefix}disablecommand command\` - Disables the command.`,
  ],
};

module.exports.run = (client, message, args) => {
  // Support for multiple commands, filter on Boolean removes empty strings.
  const commands = args.split(',').map(arg => _.trim(arg)).filter(Boolean);

  commands.forEach((commandName) => {
    // Return if the command doesnt exist.
    if (!client.commands.some(elem => elem.name === commandName)) {
      message.react('❓');
      message.channel.send(`"${commandName}" is not a valid command.`).then((msg) => {
        msg.delete(5000); // Delete the message ten seconds
      });
      return;
    }

    // Check if the command is diasbled
    if (db.commandIsDisabled(message.guild, commandName)) {
      message.react('❌');
      message.channel.send(`"${commandName}" is already disabled.`).then((msg) => {
        msg.delete(5000); // Delete the message ten seconds
      });
      return;
    }

    // Disable the command
    db.disableCommand(message.guild, commandName);
    message.react('✅');
  });
};
