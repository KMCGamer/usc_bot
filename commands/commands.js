const tab = '          ';

const commands = {
  help: {
    syntax: '!help [-admin]',
    description: 'displays all the commands and their descriptions.',
    admin: false,
  },
  roles: {
    syntax: '!roles [-list] [(-add | -remove) @person role] [(-enable | -disable) role]',
    description: 'assign or deassign a role to a mentioned user.',
    issue: require('./roles.js'),
    admin: false,
  },
  ping: {
    syntax: '!ping',
    description: 'check if the bot is responding properly.',
    issue: (message) => { message.channel.send('pong!'); },
    admin: true,
  },
  motd: {
    syntax: '!motd [-edit message]',
    description: 'prints message of the day.',
    issue: require('./motd.js'),
    admin: false,
  },
  eval: {
    syntax: '!eval \\```code\\```',
    description: 'evaluates javascript code.',
    issue: require('./eval.js'),
    admin: true,
  },
  verify: {
    syntax: '!verify [usc_email] [verification_number]',
    description: 'verify yourself as a student.',
    issue: require('./verify.js'),
    admin: false,
  },
  listroles: {
    issue: require("./listroles")
  }
};

commands.help.issue = function issue(message) {
  // check if admin option is on or not.
  const adminOption = message.content.split(/ +/g)[1] === '-admin';

  let str = '';

  adminOption ? str = '__Admin Commands:__\n' : str = '__General Commands:__\n';

  Object.keys(commands).filter(elem => commands[elem].admin === adminOption).forEach((key) => {
    str += `__**${key}:**__ ${commands[key].description}\n${tab}**syntax:** ${commands[key].syntax}\n`;
  });

  str += '__Full commands list:__ <https://goo.gl/eFN6wF>';
  message.channel.send(str);
};

module.exports = commands;
