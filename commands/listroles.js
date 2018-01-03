const _ = require('lodash');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'listroles',
  syntax: `${config.prefix}listroles [-a]`,
  description: 'List all roles.',
  help: 'Lists the roles (not including "\\@everyone")',
  usage: [
    `\`${config.prefix}listroles\` - lists only the enabled roles`,
    `\`${config.prefix}listroles -a\` - lists all roles`,
  ],
};

module.exports.run = (client, message, args) => {
  // Pull all the names of roles except @everyone
  let roles = _.remove(message.guild.roles.array(), role => role.name !== '@everyone');

  // Sort array alphabetically
  roles.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  let title;

  switch (args) {
    case '-a': // display all roles
      title = 'List of All Roles';
      roles = roles.map(role => role.name);
      break;
    default: // display only enabled roles
      title = 'List of Enabled Roles';
      roles = roles.filter(role => !db.roleIsDisabled(message.guild, role)).map(role => role.name);
      break;
  }

  // List roles inside of an embed, makes it look pretty.
  const embed = {
    embed: {
      color: 12388653,
      author: {
        name: title,
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
