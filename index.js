/// Require modules ///
const { Client, Collection }   = require('discord.js');
const { readdirSync }          = require('fs');
const { blue, red }            = require('chalk');
const { token }                = require('./conf.json');

/// Initiate the client ///
const client = new Discord.Client({
    disableEveryone: true
});

client.commands = new Discord.Collection();
client.settings = {
    defaultPrefix: '?'
}

/// Command handler ///
const commandFiles = readdirSync('./commands');

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/// Events ///
client.on('ready', () => {
    console.log(blue(`Ready and logged in as ${client.user.username}`));
    client.user.setActivity(`Playing on ${client.guilds.size} guilds with ${client.users.size} users | ?help`);
});

client.on('message', (msg) => {
    if(!msg.content.startsWith(client.settings.defaultPrefix) || msg.author.bot) return;

    const args = msg.content.slice(client.settings.defaultPrefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;

    try {
        command.execute(client, msg, args);
        console.log(blue(`${msg.author.tag} ran command ${commandName ? command.name : command.name}`));
    } catch(e) {
        console.log(red(e));
        msg.channel.send(`Error whilst executing command \`${commandName.slice(client.settings.defaultPrefix.length)}\``);
    }
});

/// Login ///
client.login(token);
