const config = require('../config/config');

// Metadata
module.exports = {
  name: 'ping',
  syntax: `${config.prefix}ping`,
  description: 'Pings the bot',
  help: 'Pings the bot to see if it is online and responsive. When the bot responds back "pong!", the bot is working as intended.',
  usage: [
    `\`${config.prefix}ping\` - The bot responds back "pong!"`,
  ],
};

module.exports.run = (client, message, args) => {
  message.channel.send('pong!').then(msg => msg.delete(5000));
};
