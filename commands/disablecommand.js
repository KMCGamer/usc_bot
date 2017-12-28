const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'disablecommand',
  description: 'Disable a command',
  syntax: `${config.prefix}disablecommand command`,
};

module.exports.run = (client, message, args) => {
  message.channel.send('Coming soon!');
};
