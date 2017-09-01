"use strict";

const tab = "          ";

const commands = {
    "help": {
        "syntax": "!help",
        "description": "displays all the commands and their descriptions.",
        "admin": false
    },
    "roles": {
        "syntax": "!roles <add/remove/list> @person <role>",
        "description": "assign or deassign a role to a mentioned user.",
        "issue": require("./roles.js"),
        "admin": false
    },
    "ping": {
        "syntax": "!ping",
        "description": "check if the bot is responding properly.",
        "issue": (message) => { message.channel.send("pong!"); },
        "admin": false
    },
    "motd": {
        "syntax": "!motd",
        "description": "message of the day.",
        "issue": (message) => { message.channel.send("Type !help for commands!"); },
        "admin": false
    }
};

commands.help.issue = function(message) {
    let str = "";
    Object.keys(commands).forEach(key => {
        str += `__**${key}:**__ ${commands[key]["description"]}\n${tab}**syntax:** ${commands[key]["syntax"]}\n`;
    });
    message.channel.send(str);
}

module.exports = commands;