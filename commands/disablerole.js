const db = require('../DBController.js');

function disableRole(message, args) {
  // Find the role in the guild
  const role = message.guild.roles.find(elem => elem.name.toLowerCase() === args.toLowerCase());

  // Return if the role doesnt exist.
  if (!role) {
    message.react('❓');
    message.channel.send('Please enter a valid role name.').then((msg) => {
      msg.delete(10000); // Delete the message ten seconds
    });
    return;
  }

  // // Check if the role is diasbled
  // if (db.roleIsDisabled(message.guild.id, role.name)) {
  //   message.react('❌');
  //   message.channel.send('Sorry, this role is already disabled.').then((msg) => {
  //     msg.delete(10000); // Delete the message ten seconds
  //   });
  //   return;
  // }

  // Disable the role
  db.disableRole(message.guild, role);
  message.react('✅');
}

module.exports = disableRole;
