# cock_bot

The official University of South Carolina discord bot. Used mostly for:

 * Managing roles.
 * Displaying messages.


## Installation

### Prerequisites 

Install and update npm: 

`sudo apt-get install npm && sudo npm install npm@latest -g`


Install stable version of node using n: 

`sudo npm install n -g && sudo n stable`

### Config

Clone the github repo to your current working directory:

`sudo git clone https://github.com/KMCGamer/cock_bot.git`

Change directory into cock_bot:

`cd cock_bot/`

Create a json file called `config.json` in the current directory containing this information:
```json
{
    "authkey": "",
    "prefix": "!",
    "botName": "cock_bot",
    "botChannel": "cockbot",
}
```

Make sure you put the authentication key of the bot otherwise it will not work.


## Usage

You can either launch the bot within your terminal and keep it open or you can use a process manager.

### Option 1: Interactive

To run the bot, simply type:

`node index.js`

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

