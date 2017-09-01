"use strict";

const config = require("../config.json");

function editRole(isAdd, message, mentionedUser, requestedRole) {
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

function roles(message) {
    const messageString = message.content;
    const commandArray = messageString.split(" ");

    // if list is mentioned, write the list and exit immediately
    if (commandArray[1] === "list") {
        let roleNames = [];
        for (let [key,value] of message.guild.roles) {
            if (value.name !== "@everyone" && value.name !== config.botName) {
                roleNames.push(value.name);
            }
        }
        roleNames = roleNames.sort();
        message.channel.send("Roles: " + roleNames.join(", "));
        return;
    }

    // checks if the add or remove was chosen
    if (!(commandArray[1] === "add" || commandArray[1] === "remove")) {
        message.channel.send("Error: Invalid role action");
        return;
    }
    const isAdd = commandArray[1] === "add";

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

    // check if the bot is higher than the mentioned user
    // if (message.guild.members.find("name", config.botName).highestRole) {

    // }
    
    // check if the role name is valid
    if (!message.guild.roles.find("name", commandArray.slice(3,commandArray.length).join(" "))) {
        message.channel.send("Error: Invalid group name");
        return;
    }

    const requestedRole = message.guild.roles.find("name", commandArray.slice(3,commandArray.length).join(" "));

    // make sure the role is not admin or president
    if (requestedRole.name === "Admin" || requestedRole.name === "President" || 
        requestedRole.name === "Officer" ) {
        message.channel.send("This bot is not allowed to manage Admin, President, or Officer roles.");
        return;
    }

    // Todo, figure out if the user already has the role...
    if (mentionedUser.roles.get(requestedRole.id) && isAdd){
        message.channel.send("User already has this role.");
        return;
    } else if (!mentionedUser.roles.get(requestedRole.id) && !isAdd){
        message.channel.send("This role has already been removed from the user.");
        return;
    }

    // Do role changes with all permissions if you're an admin or president
    if (message.member.highestRole.name == "Admin" || message.member.highestRole.name == "Officer"){

        editRole(isAdd, message, mentionedUser, requestedRole).catch((reason) => {
            if (reason.message === "Missing Permissions") {
                message.channel.send("The bot does not have appropriate permissions.");
            }
        });
        return;
    // for the plebs
    } else {
        let admin = message.guild.roles.find("name", "Admin");
        let officer = message.guild.roles.find("name", "Officer");
        // check if the mentioned user is the same as the user writing the command
        if (mentionedUser !== message.member) {
            message.channel.send("You do not have permission to edit another persons roles");
            return;
        }

        // Special roles
        if (isAdd) {
            if (requestedRole.name === "Student") {
                message.channel.send(`${admin}, ${officer}: please verify student request.`);
                return;
            } else if (/^USC \w+ Team/.test(requestedRole.name)) {
                message.channel.send(`${admin}, ${officer}: please verify team entry request.`);
                return;
            } else if (requestedRole.name === "Student Media") {
                message.channel.send(`${admin}, ${officer}: please verify student media request.`);
                return;
            }
        }

        // The rest of the roles do not need special permissions
        editRole(isAdd, message, mentionedUser, requestedRole).catch((reason) => {
            if (reason.message === "Missing Permissions") {
                message.channel.send("The bot does not have appropriate permissions.");
            }
        });
        return;
    }
}

module.exports = roles;