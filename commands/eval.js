const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'eval',
  syntax: `${config.prefix}eval '''code'''`,
  description: 'Evaluate javascript code',
};

module.exports.run = (client, message, args) => {
  let code = '';

  // if it doesnt start and end with three back ticks, dont run it.
  if (/```[\s\S]*```/.test(message.content)) {
    code = message.content.match(/```([\s\S]*)```/)[1].replace(/[\n\t]/g, '');
  } else {
    message.channel.send('Invald sytax for evaluation.');
    return;
  }

  /*
    Run the code and print out the answer to the channel.
    The eval has access to the db as well as the message itself
    which can display information about the server.
  */
  try {
    const answer = eval(`(function(){${code}})()`);
    message.channel.send(answer).catch((err) => { message.channel.send(`Error: ${err.message}`); });
  } catch (error) {
    message.channel.send(`Error: ${error.message}`);
  }
};
