const config = require('../config/config');

// Metadata
module.exports = {
  name: 'ping',
  syntax: `${config.prefix}ping`,
  description: 'Pings the bot',
};

module.exports.run = (client, message, args) => {
  message.channel.send('pong!').then(msg => msg.delete(5000));
};
