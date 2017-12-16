function removeRole(message, args) {
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
}

module.exports = removeRole;
