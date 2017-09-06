# Commands

All these commands will assume that you using "!" as your command prefix. If you aren't, change the examples to fit your needs.

## General Commands

| Command | Description | Syntax|
| ------- | ----------- | ----- |
| help | Display all commands for users | `!help [-admin]` |
| roles | Assign or deassign a role to a mentioned user | `!roles [-list] [(-add|-remove) @person role] [(-enable|-disable) role]` |
| motd | Display the message of the day | `!motd [-edit message]` |

### Help
Displays commands for users. Commands may have admin options not accessible to some users (roles command). Additionally, commands may only be accessed by the bot owner (eval command).

#### Options
`[-admin]` - display admin-only commands.

#### Usage
`!help` - displays non-admin commands. 

`!help -admin` - displays admin-only commands.

### Roles
Allows users to give themselves (or others) roles. A role can not be given if it is disabled. Admins are the only people who can give other people roles.

You can disable/enable roles by using the *!roles enable* or *!roles disable* command. This prevents the bot from giving people roles that you do not want assigned no matter what.

#### Options
Omitting all options will default to the -list option.

`[-list]` - lists the roles that are not disabled.

`[-add] @person role` - gives a role to a member.

`[-remove] @person role` - removes a role from a member.

##### Admin only

`[-enable] role` - enables a role to be assigned/deassigned.

`[-disable] role` - disables a role from being assigned/deassigned.

#### Usage
`!roles -list` - shows a list of roles that aren't disabled.

`!roles -add @GuildMember#0989 League of Legends` - gives the player *GuildMember* the role *League of Legends.*

`!roles -remove @GuildMember#0989 Dota` - removes the role *Dota* from *GuildMember.*

`!roles -enable USC OW Team` - allows the bot to assign/deassign the role *USC OW Team* automatically.

`!roles -disable Officer` - disallows the bot from assigning/deassigned the role *Officer* to anyone.

### Motd (Message of the Day)
Displays the message of the day. Only admins can edit the motd.

#### Options
##### Admin Only:
`[-edit] message` - edit the message of the day to a new message.

#### Usage
`!motd` - displays the message of the day.

`!motd -edit Hello!` - changes the message of the day to "Hello!"

## Admin Commands

| Command | Description | Syntax|
| ------- | ----------- | ----- |
| ping | Pings the bot | `!ping` |
| eval | Evaluate javascript code | `!eval ```<code>``` ` |

### Ping
Check if the bot is responsive. Cock_bot will respond back with "Pong!" if the command is successful.

#### Usage
`!ping` - send a ping to the bot. If successful, the bot will reply back.

### Eval
Executes raw javascript code from the chat.

If you want to execute a function with a return statement, wrap it in an [IIFE](http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html) (see second example).

#### Usage

`!eval ```message.guild.name``` ` - prints the name of the guild to the chat.

```
!eval ```(function(){
	let str = "";
    	for (var i = 0; i < 10; i++) 
        	str += " " + i;
    return str;
})();```
``` 
\- prints "0 1 2 3 4 5 6 7 8 9" to the chat.
