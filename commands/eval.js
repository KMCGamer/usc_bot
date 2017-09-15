const config = require('../config.json');

function evaluate(message) {
  // Only let the bot owner run the command.
  if (message.member.id !== config.botOwner) {
    message.channel.send('Only the bot owner may use this command.');
    return;
  }

  let code = '';

  // if it doesnt start and end with three back ticks, dont run it.
  if (/```[\s\S]*```/.test(message.content)) {
    code = message.content.match(/```([\s\S]*)```/)[1].replace(/[\n\t]/g, '');
  } else {
    message.channel.send('Invald sytax for evaluation.');
    return;
  }

  // run the code and print out the answer to the channel.
  try {
    const answer = eval(code);
    message.channel.send(answer).catch((err) => { message.channel.send(`Error: ${err.message}`); });
  } catch (error) {
    message.channel.send(`Error: ${error.message}`);
  }
}

module.exports = evaluate;
