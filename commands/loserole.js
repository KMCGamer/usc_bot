const config = require('../config/config');

// Metadata
module.exports = {
  name: 'loserole',
  syntax: `${config.prefix}loserole role`,
  description: 'Take a role away from yourself',
  help: 'Removes a role from yourself. If you remove a role from yourself and that role is disabled, you will not be able to get it back unless it is given to you or you have significant priveleges.',
  usage: [
    `\`${config.prefix}loserole role\` - Take a role away from yourself.`,
  ],
};

module.exports.run = (client, message, args) => {
  // Find the role in the guild
  const role = message.guild.roles.find(elem => elem.name.toLowerCase() === args.toLowerCase());

  // Return if the role doesnt exist.
  if (!role) {
    message.channel.send('Please enter a valid role name.');
    return;
  }

  // Remove the role from the user
  message.member.removeRole(role).then(() => {
    message.channel.send(`${role.name} has been taken from you.`);
  }).catch((err) => {
    message.channel.send(err.message);
  });
};
