"use strict";

const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const commands = require("./commands/commands.js");

const commandsList = Object.keys(commands);

client.on("ready",() => {
    console.log("This bot has started.");
    client.user.setGame("!help");

    client.guilds.forEach((value, key) => {
    });

});

client.on('message', (message) => {

    // Only accept commands in the uscbot channel
    if (message.channel.name !== config.botChannel) return;

    // Do not listen to commands that are made by a bot
    if (message.author.bot) return;

    // Do not listen if the command doesnt start with the specified prefix
    if (message.content.slice(0, config.prefix.length) !== config.prefix) return;

    const command = message.content.split(" ")[0].slice(config.prefix.length);

    // Dont run any commands if its invalid.
    if (!commandsList.includes(command)) {
        message.reply("Please enter a valid command.");
        return;
    }

    try {
        commands[command].issue(message);  
    } catch (err) {
        message.channel.send(`${message.guild.members.get(config.god)}: The bot ran into an unexpected error. Fix this shit.`);
        console.log(err);
    }
});

client.login(config.authkey);