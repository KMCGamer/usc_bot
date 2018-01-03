const config = require('../config/config');

// Metadata
module.exports = {
  name: 'eval',
  syntax: `${config.prefix}eval '''code'''`,
  description: 'Evaluate javascript code.',
  help: 'Allows a custom function to be run. This command can be very dangerous and should only be run by people who know what they\'re doing. Everything written inside of triple backticks will be run in an IIFE. Whatever is returned by the IIFE will be printed back by the bot in a message. You have access to `client` and `message`.',
  usage: [
    `\`${config.prefix}eval '''code'''\` - The bot replys whatever is returned by the code surrounded in backticks.`,
  ],
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
