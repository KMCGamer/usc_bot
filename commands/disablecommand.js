const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'disablecommand',
  description: 'Disable a command',
  syntax: `${config.prefix}disablecommand command`,
};

module.exports.run = (client, message, args) => {
  const commandName = args;

  // Return if the role doesnt exist.
  if (!client.commands.some(elem => elem.name === commandName)) {
    message.react('❓');
    message.channel.send('Please enter a valid command.').then((msg) => {
      msg.delete(10000); // Delete the message ten seconds
    });
    return;
  }

  // Check if the role is diasbled
  if (db.commandIsDisabled(message.guild, commandName)) {
    message.react('❌');
    message.channel.send('Sorry, this command is already disabled.').then((msg) => {
      msg.delete(10000); // Delete the message ten seconds
    });
    return;
  }

  // Disable the role
  db.disableCommand(message.guild, commandName);
  message.react('✅');
};
