const db = require('../DBController.js');

function enableRole(message, args) {
  // Find the role in the guild
  const role = message.guild.roles.find(elem => elem.name.toLowerCase() === args.toLowerCase());

  // Return if the role doesnt exist.
  if (!role) {
    message.channel.send('Please enter a valid role name.');
    return;
  }

  // Enable the role
  db.removeDisabledRole(message.guild, role);
  message.react('✅');
}

module.exports = enableRole;
