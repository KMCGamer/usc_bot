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
    addUser(serverid, userid) {
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
    
    giveCommandToUser(serverid, userid, command) {

    }

    removeRoleFromUser(serverid, userid, command) {

    }
}


module.exports = DBController;