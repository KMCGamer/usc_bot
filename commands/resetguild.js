const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'resetguild',
  syntax: `${config.prefix}resetguild`,
  description: 'Reset guild bot configurations',
};

module.exports.run = (message, args) => {

  // TODO: add a warning and a confirmation to this!
  db.resetGuild(message.guild);
};
