const db = require('../DBController.js');

function gainRole(message, args) {
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
}

module.exports = gainRole;
