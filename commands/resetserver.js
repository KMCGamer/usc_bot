const db = require('../DBController.js');

function resetserver(message, args) {

  // TODO: add a warning and a confirmation to this!
  db.resetServer(message.guild.id);
}

module.exports = resetserver;

