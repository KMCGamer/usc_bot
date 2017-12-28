const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'enablerole',
  syntax: `${config.prefix}enablerole role`,
  description: 'Enable a role',
};

module.exports.run = (client, message, args) => {
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
};
