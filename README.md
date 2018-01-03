![uscbot-2](https://user-images.githubusercontent.com/6385983/34280715-d90ed39c-e687-11e7-82bc-9693a94b19ec.png)

The official **University of South Carolina** discord bot. Used mostly for:

 * Managing roles
 * Authenticating students
 * Displaying messages
 * _Fun stuff coming soon!_

## Installation

### 1. Prerequisites

Make sure node and npm are installed and updated. Easiest way is downloading through [nvm](https://github.com/creationix/nvm).

Install nvm script:

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`

_Close and reopen terminal._

Install node through nvm:

`nvm install node`

Set default node version to latest:

`nvm use node`

Repeat the above steps for the root user as well (see [nvm issue #43](https://github.com/creationix/nvm/issues/43#issuecomment-335053139)).

### 2. usc_bot and node_modules

Clone the github repo to your current working directory:

`sudo git clone https://github.com/KMCGamer/usc_bot.git`

Change directory into usc_bot:

`cd usc_bot`

Install the required node modules:

`sudo npm install`

### 3. Config

Create a json file called `config.json` in the current config directory containing this information:
```json
{
    "token": "Your discord api bot token",
    "prefix": ". or ! or - or whatever you want",
    "email": {
    	"username": "bot gmail address (used for student command)",
        "password": "password for the email"
    },
    "dev": "Discord user id for the developer (used for the suggestion command)"
}
```

## Usage

You can either launch the bot within your terminal and keep it open or you can use a process manager.

### Option 1: Interactive

To run the bot, simply type:

`npm start`

Note that you will have to leave your terminal open otherwise the bot will shut off. You will not have access to the current terminal window.

### Option 2: Process Manager 2

This method will allow you to keep the bot running while you do other things in the same terminal window. The bot will continue running even when you exit the terminal.

To use a process manager, download pm2:

`sudo npm install pm2 -g`

Then launch the process using pm2:

`sudo pm2 start index.js`

To stop the bot, type:

`sudo pm2 stop index.js`

and then delete the process:

`sudo pm2 delete index.js`

## Important notes
* Make sure you have a role that has the name "Student" otherwise the student command wont work.
* "Managers" are to be treated as admins, meaning, if you don't want to give someone access to the entire server and all permissions including the ability to evaluate javascript code on the server, do not allow them to be a bot manager!
* The bot role needs to be close to the top of the role hierarchy in order to give and take user's roles.