const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'gainrole',
  syntax: `${config.prefix}gainrole role`,
  description: 'Give yourself a role',
  help: 'Gives yourself a role. Attempting to give yourself a disabled role will result in an error.',
  usage: [
    `\`${config.prefix}gainrole role\` - Give yourself a role.`,
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

  // Check if the role is diasbled
  if (db.roleIsDisabled(message.guild, role)) {
    message.channel.send('Sorry, this role is currently disabled.');
    return;
  }

  // Give the member the role
  message.member.addRole(role).then(() => {
    message.react('✅');
    message.channel.send(`You have been given the role: ${role.name}`).then((msg) => {
      msg.delete(10000); // Delete the message ten seconds
    });
  }).catch((err) => {
    message.react('💢');
    message.channel.send(err.message);
  });
};
