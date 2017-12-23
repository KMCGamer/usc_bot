![uscbot-2](https://user-images.githubusercontent.com/6385983/34280715-d90ed39c-e687-11e7-82bc-9693a94b19ec.png)

The official University of South Carolina discord bot. Used mostly for:

 * Managing roles.
 * Displaying messages.

## Installation

### Prerequisites

Make sure node and npm are installed and updated. Easiest way is downloading through [nvm](https://github.com/creationix/nvm).

Install nvm script:

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`

_Close and reopen terminal._

Install node through nvm:

`nvm install node`

Set default node version to latest:

`nvm use node`

### usc_bot and nodemodules

Clone the github repo to your current working directory:

`sudo git clone https://github.com/KMCGamer/usc_bot.git`

Change directory into usc_bot:

`cd usc_bot`

Install the required node modules:

`sudo npm install`

### Config

Create a json file called `config.json` in the current directory containing this information:
```json
{
    "token": "",
    "prefix": "!"
}
```

Make sure you put the authentication key of the bot otherwise it will not work.

## Usage

You can either launch the bot within your terminal and keep it open or you can use a process manager.

### Option 1: Interactive

To run the bot, simply type:

`npm start`

Note that you will have to leave your terminal open otherwise the bot will shut off. You will not have access to the current terminal window either.

### Option 2: Process Manager

To use a process manager, download pm2:

`sudo npm install pm2 -g`

Then launch the process using pm2:

`sudo pm2 start index.js`

To stop the bot, type:

`sudo pm2 stop index.js`

and then delete the process:

`sudo pm2 delete index.js`
