const db = require('../DBController.js');

function disableRole(message, args) {
  // Find the role in the guild
  const role = message.guild.roles.find(elem => elem.name.toLowerCase() === args.toLowerCase());

  // Return if the role doesnt exist.
  if (!role) {
    message.channel.send('Please enter a valid role name.');
    return;
  }

  // Check if the role is diasbled
  if (db.roleIsDisabled(message.guild.id, role.name)) {
    message.channel.send('Sorry, this role is already disabled.');
    return;
  }

  // Disable the role
  db.disableRole(message.guild.id, role.name);
  message.channel.send(`${role.name} has been disabled.`);
}

module.exports = disableRole;
