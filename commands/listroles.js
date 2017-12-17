const _ = require('lodash');
const { table } = require('table');
const db = require('../DBController.js');

function listroles(message) {
  // Pull all the names of roles except @everyone
  let roles = _.remove(message.guild.roles.array(), role => role.name !== '@everyone');

  // Number of columns the table should have
  const numColumns = 4;

  // Sort array alphabetically
  roles.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  // let rolenames = roles.map(role => role.name);

  // Put an asterisk next to every disabled role
  roles = roles.map(role => (db.roleIsDisabled(message.guild, role) ? `· ${role.name}*` : `· ${role.name}`));

  // Pad the roles array to make sure every row has the same number of columns
  if (roles.length % numColumns !== 0) {
    const elemsToAdd = numColumns - (roles.length % numColumns);

    for (let i = 0; i < elemsToAdd; i += 1) {
      roles.push('');
    }
  }

  // Chunk the data into groups of numColumns
  const data = _.chunk(roles, numColumns);

  // Set the border style
  const config = {
    border: {
      topBody: '─',
      topJoin: '─',
      topLeft: '┌',
      topRight: '┐',

      bottomBody: '─',
      bottomJoin: '─',
      bottomLeft: '└',
      bottomRight: '┘',

      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: ' ',

      joinBody: ' ',
      joinLeft: '|',
      joinRight: '|',
      joinJoin: ' ',
    },
  };

  // Output the table
  const output = table(data, config);
  message.channel.send(`\`\`\`\n${output}*: These roles are disabled.\`\`\`\n `).then((msg) => {
    msg.delete(60000); // Delete the message after a minute
  });
}

module.exports = listroles;
