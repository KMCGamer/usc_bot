const _ = require('lodash');
const { table, getBorderCharacters } = require('table');

// TODO: Condense all of these
const motd = require('./motd.js');
const evaluate = require('./eval.js');
const student = require('./student.js');
const listroles = require('./listroles');
const giverole = require('./giverole');
const disablerole = require('./disablerole');
const removerole = require('./removerole');
const enablerole = require('./enablerole.js');
const clearchat = require('./clearchat.js');
const resetserver = require('./resetserver.js');

const config = require('../config.json');

const db = require('../DBController.js');

const commands = [
  {
    name: 'help',
    syntax: `${config.prefix}help`,
    description: 'Displays all commands',
  },
  {
    name: 'ping',
    syntax: `${config.prefix}ping`,
    description: 'Pings the bot',
    issue: (message) => { message.channel.send('pong!').then(msg => msg.delete(5000)); },
  },
  {
    name: 'motd',
    syntax: `${config.prefix}motd`,
    description: 'Message of the day',
    issue: motd,
  },
  {
    name: 'eval',
    syntax: `${config.prefix}eval '''code'''`,
    description: 'Evaluate javascript code',
    issue: evaluate,
  },
  {
    name: 'student',
    syntax: `${config.prefix}student`,
    description: 'Verify yourself as a student',
    issue: student,
  },
  {
    name: 'listroles',
    syntax: `${config.prefix}listroles`,
    description: 'List all roles',
    issue: listroles,
  },
  {
    name: 'giverole',
    syntax: `${config.prefix}giverole role`,
    description: 'Give yourself a role',
    issue: giverole,
  },
  {
    name: 'disablerole',
    syntax: `${config.prefix}disablerole role`,
    description: 'Disable a role',
    issue: disablerole,
  },
  {
    name: 'removerole',
    syntax: `${config.prefix}removerole role`,
    description: 'Take a role away from yourself',
    issue: removerole,
  },
  {
    name: 'enablerole',
    syntax: `${config.prefix}enablerole role`,
    description: 'Enable a role',
    issue: enablerole,
  },
  {
    name: 'clearchat',
    syntax: `${config.prefix}clearchat #`,
    description: 'Clear channel by # of messages',
    issue: clearchat,
  },
  {
    name: 'resetserver',
    syntax: `${config.prefix}resetserver`,
    description: 'Reset server bot configurations',
    issue: resetserver,
  },
];

// Initialize the help command
commands[_.findIndex(commands, { name: 'help' })].issue = (message) => {
  const data = [['Command', 'Description', 'Syntax']];

  commands.forEach((command) => {
    if (db.commandIsDisabled(message.guild.id, command.name)) {
      command.name += '*';
    }
    data.push([command.name, command.description, command.syntax]);
  });

  const tableConfig = {
    border: getBorderCharacters('norc'),
  };

  const output = table(data, tableConfig);
  // Delete these message after a minute
  message.channel.send(`\`\`\`\n${output}*: These commands are disabled.\`\`\`\n`).then(msg => msg.delete(60000));
  message.channel.send('__Full commands list__: <https://goo.gl/eFN6wF>').then(msg => msg.delete(60000));
};

module.exports = commands;
