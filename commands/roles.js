"use strict";

const config = require("../config.json");
const fs = require("fs");

function editUserRole(message, commandArray){
    // checks if the add or remove was chosen
    const isAdd = commandArray[1] === "-add";
    
    // check if the 3rd word in the command is a mention
    if (!/^<@\d+>$/.test(commandArray[2])) {
        message.channel.send("Error: Invalid syntax. You must use a member mention.");
        return;
    }

    // check if the ID of the person mentioned is valid
    if (!message.guild.members.get(commandArray[2].slice(2, commandArray[2].length - 1))) {
        message.channel.send("Error: Invalid member mention");
        return;
    }
    const mentionedUser = message.mentions.members.first();

    // Nobody can edit the bots roles.
    if (mentionedUser.user.username === config.botName) {   // TODO CHANGE THIS TO ID
        message.channel.send("You may not edit this bots roles.");
        return;
    }

    // point all temporary lowercase role names to their correct uppercase role names
    const rolesDict = {};
    message.guild.roles.forEach((value, key) => {
        rolesDict[value.name.toLowerCase()] = value.name;
    });

    // check if the role name is valid (not undefined)
    const tempRole = rolesDict[commandArray.slice(3).join(" ").toLowerCase()]
    if (!tempRole) {
        message.channel.send("Error: Invalid group name");
        return;
    }

    const requestedRole = message.guild.roles.find("name", tempRole);

    // If the bots role is lower than the requested role, return.
    if (message.guild.members.get(config.clientId).highestRole.comparePositionTo(requestedRole) < 0){
        message.channel.send("Assigning/deassigning roles higher than the bots is disallowed.");
        return;
    }

    // Figure out if the user already has the role...
    if (mentionedUser.roles.get(requestedRole.id) && isAdd){
        message.channel.send("User already has this role.");
        return;
    } else if (!mentionedUser.roles.get(requestedRole.id) && !isAdd){
        message.channel.send("This role has already been removed from the user.");
        return;
    }

    // TODO GET RID OF THIS
    function editRole() {
        if (isAdd) {
            return mentionedUser.addRole(requestedRole).then(() => {
                message.channel.send(`${mentionedUser.user.username} has been given the role: ${requestedRole.name}`);
            });
        } else {
            return mentionedUser.removeRole(requestedRole).then(()=>{
                message.channel.send(`${mentionedUser.user.username} no longer has the role: ${ requestedRole.name }`);
            });
        }
    }

    // Do role changes with all permissions if you're an admin or president
    if (message.member.highestRole.name == "Admin" || message.member.highestRole.name == "Officer"){

        editRole().catch((reason) => {
            if (reason.message === "Missing Permissions") {
                message.channel.send("The bot does not have appropriate permissions.");
            }
        });
        return;

    // for the plebs
    } else {
        // check if the mentioned user is the same as the user writing the command
        if (mentionedUser !== message.member) {
            message.channel.send("You do not have permission to edit another persons roles");
            return;
        }

        // Special roles
        if (isAdd) {
            if (requestedRole.name === "Student") {
                message.channel.send("Please use the verify command. To get started, type !verify folowed by your usc email. Example: !verify kcarhart@email.sc.edu");
            }
            return;
        }

        // The rest of the roles do not need special permissions
        editRole().catch((reason) => {
            if (reason.message === "Missing Permissions") {
                message.channel.send("The bot does not have appropriate permissions.");
            }
        });

        return;
    }
}

function modifyRole(message, commandArray){
    message.channel.send("Feature coming Soon.");
}

function listRoles(message, commandArray){
    let roleNames = [];

    // read in the disabled roles.
    // TODO use require('path') to use relative paths
    fs.readFile("./data/disabledroles.txt", "utf8", (err, contents) => {
        const disabledRoles = contents.toLowerCase().split("\n");

        for (let [key,value] of message.guild.roles) {
            if (!disabledRoles.includes(value.name.toLowerCase())) {
                roleNames.push(value.name);
            }
        }

        roleNames = roleNames.sort();
        message.channel.send("Roles: " + roleNames.join(", "));
    });
    
    return;
}

function roles(message) {
    // filter out any empty element in the array
    const commandArray = message.content.split(/ +/g);

    // if only !roles is said, just print the roles because people dont read.
    // also if list is mentioned, write the list and exit immediately.
    if (commandArray.length === 1 || commandArray[1] === "-list") {
        listRoles(message, commandArray);
        return;
    }

    switch (commandArray[1]) {
        case "-add":
        case "-remove":
            editUserRole(message, commandArray);
            return;
        case "-enable":
        case "-disable":
            modifyRole(message, commandArray);
            return;
        default:
            message.channel.send("Invalid option used.");
            return;
    }
}

module.exports = roles;