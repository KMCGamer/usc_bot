// TODO: Condense all of these
const motd = require('./motd.js');
const evaluate = require('./eval.js');
const verify = require('./verify.js');
const listroles = require('./listroles');
const giverole = require('./giverole');
const disablerole = require('./disablerole');
const removerole = require('./removerole');
const config = require('../config.json');

const commands = {
  help: {
    syntax: '!help',
    description: 'displays all the commands and their descriptions.',
    issue: (message) => { message.channel.send('__Full commands list__: <https://goo.gl/eFN6wF>'); },
  },
  ping: {
    syntax: `${config.prefix}ping`,
    description: 'check if the bot is responding properly.',
    issue: (message) => { message.channel.send('pong!'); },
  },
  motd: {
    syntax: `${config.prefix}motd`,
    description: 'prints message of the day.',
    issue: motd,
  },
  eval: {
    syntax: `${config.prefix}eval \\\`\`\`code\\\`\`\``,
    description: 'evaluates javascript code.',
    issue: evaluate,
  },
  verify: {
    syntax: `${config.prefix}verify [usc_email] [verification_number]`,
    description: 'verify yourself as a student.',
    issue: verify,
  },
  listroles: {
    issue: listroles,
  },
  giverole: {
    issue: giverole,
  },
  disablerole: {
    issue: disablerole,
  },
  removerole: {
    issue: removerole,
  },
};

module.exports = commands;
