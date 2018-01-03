const config = require('../config/config');

// Metadata
module.exports = {
  name: 'suggest',
  syntax: `${config.prefix}suggest message`,
  description: 'Suggest a new feature for the bot.',
  help: 'If you would like to see the bot be able to do something it can\'t already, use this command to forward your request to the bot developer! Just use the command followed by a sentence or two explaining your idea.',
  usage: [
    `\`${config.prefix}suggest message\` - sends the dev a private message containing your request.`,
  ],
};

module.exports.run = async (client, message, args) => {
  if (args) {
    const dev = await client.fetchUser(config.dev);
    dev.send(`__**Suggestion:**__\n**Author:** ${message.author.username} <${message.author.id}>\n**Description:** ${args}`).then(() => {
      message.channel.send('Thanks for the suggestion!');
    });
  } else {
    message.channel.send('Please enter a message along with the suggest command!').then((msg) => {
      msg.delete(10000);
    });
  }
};
