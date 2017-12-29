const low = require('lowdb');
const _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

class DBController {
  // Initialize the database
  static initDatabase() {
    if (_.isEmpty(db.value())) {
      db.defaults({
        guilds: [],
        config: {},
      }).write();
    }
  }

  // Adds a guild
  static addGuild(guild) {
    db.get('guilds').push({
      guildID: guild.id,
      users: [],
      disabledRoles: [],
      managers: [],
      disabledCommands: [],
    }).write();

    // TODO: import default values
  }

  // Remove a guild
  static deleteGuild(guild) {
    db.get('guilds').remove({
      guildID: guild.id,
    }).write();
  }

  // An alias for addGuild()
  static resetGuild(guild) {
    DBController.deleteGuild(guild);
    DBController.addGuild(guild);
  }

  // Adds a user to a guild
  static addUserToGuild(guild, user) {
    // Check if the user already exists in the guild
    if (db.get('guilds').find({
      guildID: guild.id,
    }).get('users').find({
      userID: user.id,
    })
      .value()) {
      return;
    }

    // Add the user to the guild
    db.get('guilds').find({
      guildID: guild.id,
    }).get('users').push({
      userID: user.id,
      student: false,
      extraCommands: [],
    })
      .write();
  }

  // Authenticates the user as a student
  static makeUserStudent(guild, user) {
    db.get('guilds').find({
      guildID: guild.id,
    }).get('users').find({
      userID: user.id,
    })
      .assign({
        student: true,
      })
      .write();

    // removeUserKeycode()
  }

  // Disable a role from being assigned by the bot
  static disableRole(guild, role) {
    db.get('guilds').find({
      guildID: guild.id,
    }).get('disabledRoles').push(role.id)
      .write();
  }

  // Remove a role that has been disabled
  static removeDisabledRole(guild, role) {
    db.get('guilds').find({
      guildID: guild.id,
    }).get('disabledRoles').pull(role.id)
      .write();
  }

  // Returns true if the role is disabled for the guild
  static roleIsDisabled(guild, role) {
    const roleIndex = db.get('guilds').find({
      guildID: guild.id,
    }).get('disabledRoles').indexOf(role.id)
      .value();

    return roleIndex !== -1;
  }

  // Returns true if the guild is already in the db
  static guildExists(guild) {
    return !!db.get('guilds').find({ guildID: guild.id }).value();
  }

  // Adds a bot manager to the guild (like an admin)
  static addManager(guild, user) {
    db.get('guilds').find({
      guildID: guild.id,
    }).get('managers').push(user.id)
      .write();
  }

  // Disables a command from being given
  static disableCommand(guild, command) {
    db.get('guilds').find({
      guildID: guild.id,
    }).get('disabledCommands').push(command)
      .write();
  }

  // Checks if a command is already disabled
  static commandIsDisabled(guild, command) {
    const commandIndex = db.get('guilds').find({
      guildID: guild.id,
    }).get('disabledCommands').indexOf(command)
      .value();

    return commandIndex !== -1;
  }

  // Gives a keycode to a user for verification
  static giveUserKeycode(guild, user) {
    const keycode = [0, 0, 0, 0].map(() => _.random(0, 9)).join('');

    db.get('guilds').find({
      guildID: guild.id,
    }).get('users').find({
      userID: user.id,
    })
      .assign({
        keycode,
      })
      .write();
  }

  // TODO: removeUserKeycode()
  // TODO: removeManager()
}


module.exports = DBController;
