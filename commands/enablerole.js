const db = require('../modules/dbcontroller.js');
const config = require('../config/config');
const _ = require('lodash');

// Metadata
module.exports = {
  name: 'enablerole',
  syntax: `${config.prefix}enablerole role`,
  description: 'Enable a role',
  help: 'Primarily used to undo the `disablerole` command. This opens up the role to be able given to the general user. Only enable roles that have little permissions.',
  usage: [
    `\`${config.prefix}enablerole role\` - Removes restrictions on a specific role.`,
  ],
};

module.exports.run = (client, message, args) => {
  // Support for multiple roles
  const roles = args.split(',').map(arg => _.trim(arg)).filter(Boolean);

  roles.forEach((roleName) => {
    // Find the role in the guild
    const role = message.guild.roles.find(elem => elem.name.toLowerCase() === roleName.toLowerCase());

    // Return if the role doesnt exist.
    if (!role) {
      message.react('❓');
      message.channel.send(`"${roleName}" is not a valid role name.`).then((msg) => {
        msg.delete(5000);
      });
      return;
    }

    // Check if the role isn't disabled
    if (!db.roleIsDisabled(message.guild, role)) {
      message.react('❌');
      message.channel.send(`"${roleName}" is already enabled.`).then((msg) => {
        msg.delete(5000);
      });
      return;
    }

    // Enable the role
    db.removeDisabledRole(message.guild, role);
    message.react('✅');
  });
};
