const _ = require("lodash");
const {table, getBorderCharacters} = require('table');

function listroles(message) {
    // Pull all the names of roles except @everyone
    let roles = _.pull(message.guild.roles.map((role)=> role.name), "@everyone");

    // Number of columns the table should have
    const numColumns = 4;

    // Pad the roles array to make sure every row has the same number of columns
    if (roles.length % numColumns !== 0){
        const elemsToAdd = numColumns - (roles.length % numColumns);

        for (let i = 0; i < elemsToAdd; i++){
            roles.push("");
        }
    }

    // Chunk the data into groups of numColumns
    const data = _.chunk(roles, numColumns);
    
    // Set the border style
    const config = {
        border: getBorderCharacters("norc")
    };

    // Output the table
    output = table(data, config);
    message.channel.send("```\n" + output + "\n```");
}

module.exports = listroles;