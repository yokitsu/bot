/// Require modules ///
const { Client, Collection }   = require('discord.js');
const { readdirSync, readdir } = require('fs');
const { blue, red }            = require('chalk');
const { token }                = require('./conf.json');

/// Initiate the client ///
const client = new Client({
    disableEveryone: true
});

client.commands = [];
client.settings = {
    defaultPrefix: '?'
}
client.config = require('./conf.json');

/// Command handler ///
const categories = readdirSync('./commands');
for (let i = 0; i < categories.length; i++) {
    readdir(`./commands/${categories[i]}`, (err, files) => {
        if (err) throw err;
        console.log(`[${categories[i].toString()}] Loading ${files.length} commands!`);
        files.forEach(f => {
            const uwu = require(`./commands/${categories[i]}/${f}`);
            client.commands.push(uwu);
        });
    });
}

/// Events ///
client.on('ready', () => {
    console.log(blue(`Ready and logged in as ${client.user.username}`));
    client.user.setActivity(`Playing on ${client.guilds.size} guilds with ${client.users.size} users | ${client.settings.defaultPrefix}help`);
});

client.on('message', (msg) => {
    if(!msg.content.startsWith(client.settings.defaultPrefix) || msg.author.bot) return;

    const args = msg.content.slice(client.settings.defaultPrefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.find(c => c.name.includes(commandName) || c.aliases.includes(commandName));
    if(!command) return;

    try {
        command.execute(client, msg, args);
        console.log(blue(`${msg.author.tag} ran command ${commandName ? command.name : command.name}`));
    } catch(e) {
        console.log(red(e.stack));
        msg.channel.send(`Error whilst executing command \`${commandName.slice(client.settings.defaultPrefix.length)}\``);
    }
});

/// Login ///
client.login(token);
