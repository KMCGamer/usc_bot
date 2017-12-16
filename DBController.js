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
        servers: [],
        config: {},
      }).write();
    }
  }

  // Adds a server
  static addServer(serverid) {
    db.get('servers').push({
      serverid,
      users: [],
      disabledRoles: [],
      managers: [],
      disabledCommands: [],
    }).write();
  }

  // Remove a server
  static deleteServer(serverid) {
    db.get('servers').remove({
      serverid,
    }).write();
  }

  // An alias for addServer()
  static resetServer(serverid) {
    DBController.addServer(serverid);
  }

  // Adds a user to a server
  static addUserToServer(serverid, userid) {
    // Check if the user already exists in the server
    if (db.get('servers').find({
      serverid,
    }).get('users').find({
      userid,
    })
      .value()) {
      return;
    }

    db.get('servers').find({
      serverid,
    }).get('users').push({
      userid,
      student: false,
      extraCommands: [],
    })
      .write();
  }

  // Authenticates the user as a student
  static makeUserStudent(serverid, userid) {
    db.get('servers').find({
      serverid,
    }).get('users').find({
      userid,
    })
      .assign({
        student: true,
      })
      .write();
  }

  // Disable a role from being assigned by the bot
  static disableRole(serverid, role) {
    db.get('servers').find({
      serverid,
    }).get('disabledRoles').push(role)
      .write();
  }

  // Remove a role that has been disabled
  static removeDisabledRole(serverid, role) {
    db.get('servers').find({
      serverid,
    }).get('disabledRoles').pull(role)
      .write();
  }

  // Returns true if the server is already in the db
  static serverExists(serverid) {
    return !!db.get('servers').find({ serverid }).value();
  }

  // Returns true if the role is disabled for the server
  static roleIsDisabled(serverid, role) {
    const roleIndex = db.get('servers').find({
      serverid,
    }).get('disabledRoles').indexOf(role)
      .value();

    return roleIndex !== -1;
  }

  // Adds a bot manager to the server (like an admin)
  static addManager(serverid, userid) {
    db.get('servers').find({
      serverid,
    }).get('managers').push(userid)
      .write();
  }

  static disableCommand(serverid, command) {
    db.get('servers').find({
      serverid,
    }).get('disabledCommands').push(command)
      .write();
  }

  static commandIsDisabled(serverid, command) {
    const commandIndex = db.get('servers').find({
      serverid,
    }).get('disabledCommands').indexOf(command)
      .value();

    return commandIndex !== -1;
  }

  static giveUserKeycode(serverid, userid) {
    const keycode = [0, 0, 0, 0].map(() => _.random(0, 9));

    db.get('servers').find({
      serverid,
    }).get('users').find({
      userid,
    })
      .assign({
        keycode,
      })
      .write();
  }

  // TODO: removeManager()
}


module.exports = DBController;
