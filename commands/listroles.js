const _ = require('lodash');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'listroles',
  syntax: `${config.prefix}listroles`,
  description: 'List all roles',
};

module.exports.run = (client, message, args) => {
  // Pull all the names of roles except @everyone
  let roles = _.remove(message.guild.roles.array(), role => role.name !== '@everyone');

  // Sort array alphabetically
  roles.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  // Put an asterisk next to every disabled role
  roles = roles.map(role => (db.roleIsDisabled(message.guild, role) ? `${role.name}*` : `${role.name}`));

  roles = roles.join('\n');

  message.channel.send(`\`\`\`\n${roles}*: These roles are disabled.\`\`\`\n `).then((msg) => {
    msg.delete(60000); // Delete the message after a minute
  });
};
