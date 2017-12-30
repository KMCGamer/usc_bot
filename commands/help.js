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
  const buttons = [
    reactions.zero, reactions.one,
    reactions.two, reactions.three,
    reactions.four, reactions.five,
    reactions.six, reactions.seven,
    reactions.eight, reactions.nine,
  ];

  const commandsPerPage = 8;

  let pages;
  switch (args) {
    case '-a': {
      pages = _.chunk(client.commands, commandsPerPage);
      break;
    }
    default: {
      const enabledCommands = client.commands.filter(cmd => !db.commandIsDisabled(message.guild, cmd.name));
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
    /*
    TODO: fix this so that ESLint doesnt freak out.
    For some reason await really only works with for..of
    */
    // react number buttons
    for (const [index, value] of pages.entries()) {
      await msg.react(buttons[index]);
    }

    // react delete button
    await msg.react(reactions.x);
    msg.delete(60000).catch();

    // Collect reactions for the help message
    const collector = msg.createReactionCollector((reaction, user) => user !== client.user);

    collector.on('collect', async (messageReaction) => {
      // If the x button is pressed, remove the message.
      if (messageReaction.emoji.name === reactions.x) {
        msg.delete(); // Delete the message
        collector.stop(); // Get rid of the collector.
        return;
      }
      
      // Get the index of the page by button pressed
      const pageIndex = buttons.indexOf(messageReaction.emoji.name);

      // Return if emoji is irrelevant or the page doesnt exist (number too high)
      if (pageIndex === -1 || !pages[pageIndex]) return;

      // Edit the message to show the new page.
      msg.edit(pages[pageIndex]);

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
