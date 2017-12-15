const low = require('lowdb');
const _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

class DBController {

    // Initialize the database
    constructor() {
        if (_.isEmpty(db.value())){
            db.defaults({
                servers: [],
                config: {}
            }).write();
        }
    }

    // Adds a server
    addServer(serverid) {
        db.get('servers').push({
            serverid: serverid,
            users:[],
            disabledRoles: []
        }).write();
    }

    // Remove a server
    deleteServer(serverid) {
        db.get('servers').remove({
            serverid: serverid
        }).write();
    }

    // An alias for addServer()
    resetServer(serverid){
        addServer(serverid);
    }

    // Adds a user to a server
    addUserToServer(serverid, userid) {
        db.get('servers').find({
            serverid: serverid
        }).get('users').push({
            userid: userid,
            student: false,
            extraCommands: []
        }).write();
    }

    // Authenticates the user as a student
    makeUserStudent(serverid, userid) {
        db.get('servers').find({
            serverid: serverid
        }).get('users').find({
            userid: userid
        }).assign({
            student: true
        }).write();
    }
    
    // Disable a role from being assigned by the bot
    disableRole(serverid, role) {
        db.get('servers').find({
            serverid: serverid
        }).get('disabledRoles').push(role).write();
    }

    enableRole() {

    }
}


module.exports = DBController;