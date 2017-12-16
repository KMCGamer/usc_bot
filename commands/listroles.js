const _ = require('lodash');
const { table, getBorderCharacters } = require('table');
const db = require('../DBController.js');

function listroles(message) {
  // Pull all the names of roles except @everyone
  let roles = _.pull(message.guild.roles.map(role => role.name), '@everyone');

  // Number of columns the table should have
  const numColumns = 4;

  // Sort array alphabetically
  roles.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Put an asterisk next to every disabled role
  roles = roles.map(elem => (db.roleIsDisabled(message.guild.id, elem) ? `${elem}*` : elem));

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
    border: getBorderCharacters('norc'),
  };

  // Output the table
  const output = table(data, config);
  message.channel.send(`\`\`\`\n${output}\n*: These roles are currently disabled.\n\`\`\`\n `);
}

module.exports = listroles;
