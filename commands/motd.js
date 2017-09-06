"use strict";

const config = require("../config.json");
const fs = require("fs");

function motd(message) {
    message.channel.send("Type !help for commands!");
}

module.exports = motd;