const config = require('../config/config');

// Metadata
module.exports = {
  name: 'motd',
  syntax: `${config.prefix}motd`,
  description: 'Message of the day',
};

module.exports.run = (client, message, args) => {
  message.channel.send('Type !help for commands!');
};
