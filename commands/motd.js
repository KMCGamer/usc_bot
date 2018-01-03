const config = require('../config/config');

// Metadata
module.exports = {
  name: 'motd',
  syntax: `${config.prefix}motd [-e message]`,
  description: 'Message of the day.',
  help: 'Display the message of the day. COMING SOON: ability to edit the message of the day.',
  usage: [
    `\`${config.prefix}motd\` - Show the message of the day.`,
    `\`${config.prefix}motd -e message\` -  COMING SOON. Make a new message of the day.`,
  ],
};

module.exports.run = (client, message, args) => {
  message.channel.send('Type !help for commands!');
};
