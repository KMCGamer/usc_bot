const db = require('../DBController.js');

function resetGuild(message, args) {

  // TODO: add a warning and a confirmation to this!
  db.resetGuild(message.guild);
}

module.exports = resetGuild;
