const config = require('../config/config');

// Metadata
module.exports = {
  name: 'clearchat',
  description: 'Clear channel by # of messages',
  syntax: `${config.prefix}clearchat #`,
  help: 'Clears the current chat channel by the number of messages specified. Only values 1-99 will be accepted. The default value is 10 messages',
  usage: [
    `\`${config.prefix}clearchat #\` - removes the last '#' number of messages.`,
  ],
};

module.exports.run = (client, message, args) => {
  // Default to 10 messages.
  const numOfMessages = args ? parseInt(args, 10) : 10;

  // Delete the message including the one just written
  message.channel.bulkDelete(numOfMessages + 1).then(() => {
    message.channel.send(`Up to ${numOfMessages} chat messages deleted.`).then((msg) => {
      msg.delete(5000); // Delete the message five seconds
    });
  }).catch((err) => {
    message.react('❌');
    message.channel.send(err.message);
  });
};
