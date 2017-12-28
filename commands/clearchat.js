const config = require('../config/config');

// Metadata
module.exports = {
  name: 'clearchat',
  description: 'Clear channel by # of messages',
  syntax: `${config.prefix}clearchat #`,
};

module.exports.run = (client, message, args) => {
  const numOfMessages = parseInt(args, 10);
  message.channel.bulkDelete(numOfMessages + 1).then(() => {
    message.channel.send(`Up to ${numOfMessages} chat messages deleted.`).then((msg) => {
      msg.delete(5000); // Delete the message five seconds
    });
  }).catch((err) => {
    message.react('❌');
    message.channel.send(err.message);
  });
};
