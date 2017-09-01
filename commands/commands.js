"use strict";

const tab = "          ";

const commands = {
    "help": {
        "syntax": "!help",
        "description": "displays all the commands and their descriptions.",
    },
    "roles": {
        "syntax": "!roles <add/remove/list> @person <role>",
        "description": "assign or deassign a role to a mentioned user.",
        "issue": require("./roles.js")
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