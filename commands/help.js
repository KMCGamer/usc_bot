const _ = require('lodash');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');
const reactions = require('../modules/reactions');

// Metadata
module.exports = {
  name: 'help',
  syntax: `${config.prefix}help`,
  help: '',
  description: 'Displays all commands',
};

module.exports.run = (client, message, args) => {
  const numPages = 2; // Number of pages for commands

  let pages;
  switch (args) {
    case '-a': {
      const commandsPerPage = Math.ceil(client.commands.length / numPages);
      pages = _.chunk(client.commands, commandsPerPage);
      break;
    }
    default: {
      const enabledCommands = client.commands.filter(cmd => !db.commandIsDisabled(message.guild, cmd.name));
      const commandsPerPage = Math.ceil(enabledCommands.length / numPages);
      pages = _.chunk(enabledCommands, commandsPerPage);
      break;
    }
  }

  // Parse the commands into embed message data
  pages = pages.map((page) => {
    const fields = page.map(command => ({
      name: `__${command.name}__`,
      value: `Description: ${command.description}.\nSyntax: \`${command.syntax}\``,
    }));

    return {
      embed: {
        color: 12388653,
        author: {
          name: 'Click Here For Full List',
          url: 'https://goo.gl/eFN6wF',
          icon_url: 'https://user-images.githubusercontent.com/6385983/34427109-5772d042-ec0c-11e7-896d-7e9096b92856.png',
        },
        fields,
      },
    };
  });

  // Send the first help page with buttons that display other pages when clicked
  message.channel.send(pages[0]).then(async (msg) => {
    await msg.react(reactions.one);
    await msg.react(reactions.two);
    await msg.react(reactions.x);

    const collector = msg.createReactionCollector((reaction, user) => user !== client.user);

    // TODO: make this so that it depends on the numPages
    collector.on('collect', async (messageReaction) => {
      switch (messageReaction.emoji.name) {
        case reactions.x: // remove the message
          messageReaction.message.delete();
          return;
        case reactions.one: // display first page
          messageReaction.message.edit(pages[0]);
          break;
        case reactions.two: // display second page
          messageReaction.message.edit(pages[1]);
          break;
        default:
          break;
      }

      /*
      Get the user that clicked the reaction and remove the reaction.
      This matters because if you just do remove(), it will remove the bots
      reaction which will have unintended side effects.
      */
      const notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
      await messageReaction.remove(notbot);
    });
  }).catch(err => console.log(err));
};
