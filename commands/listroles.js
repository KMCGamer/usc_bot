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
  roles = roles.filter(role => !db.roleIsDisabled(message.guild, role)).map(role => role.name);

  // List roles inside of an embed, makes it look pretty.
  const embed = {
    embed: {
      color: 12388653,
      author: {
        name: 'List of All Roles',
        icon_url: client.user.avatarURL,
      },
      fields: [{
        name: '__Roles:__',
        value: roles.join('\n'),
      }],
    },
  };

  message.channel.send(embed).then((msg) => {
    msg.delete(60000); // Delete the message after a minute
  });
};
