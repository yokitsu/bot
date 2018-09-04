const { readdir, readdirSync } = require('fs');
const { PREFIX } = process.env;
const { escapeRegExp } = require('../../util/Util');

module.exports = class CommandRegistry {
  /**
   * Construct a new CommandRegistry class.
   * 
   * @param {import('../Client')} bot the bot client
   */
  constructor(bot) {
    this.bot = bot;
  }

  /**
   * Builds the commands
   */
  async build() {
    const categories = await readdirSync('./commands');

    for (let i = 0; i < categories.length; i++) {
      readdir(`./commands/${categories[i]}`, (err, files) => {
        if (err) console.error(err.stack);
        console.info(`[${categories[i]}] Loading ${files.length} commands...`);
        files.forEach(f => {
          try {
            const cmd = require(`../../commands/${categories[i]}/${f}`);

            if (cmd.disabled) return;
            if (this.bot.cmds.has(cmd.command)) console.warn(`[${cmd.command}] Command is in the collection already.`);

            this.bot.cmds.set(cmd.command, cmd);
            console.info(`[${cmd.command}] Command ${cmd.command} has been registered!`);
          } catch(error) {
            console.error(`[${f.replace('.js', '')}] Command has errored:\n${error.stack}`)
          }
        });
      });
    }
  }

  /**
   * Handles the command
   * 
   * @param {import('discord.js').Message} msg Discord.js' message class
   * @returns {Promise}
   */
  async handleCommand(msg) {
    if (msg.author.bot || !this.bot.ready) return;

    const prefix = new RegExp(`^<@${this.bot.user.id}> |^${escapeRegExp(PREFIX)}`)
      .exec(msg.content);

    if (!prefix) return;

    const args = msg.content.slice(prefix[0].length).trim().split(/ +/g);
    const command = args.shift();
    const cmd = this.bot.cmds.filter(c => c.command === command || c.aliases.includes(command));

    if (cmd.length > 0) {
      if (cmd[0].guildOnly && msg.channel.type === 'dm') return msg.channel.send(`:x: You must be in a guild to execute the \`${cmd[0].command}\` command.`);
      if (cmd[0].ownerOnly && !this.bot.getOP(msg.author.id)) return msg.channel.send(`:x: You must be the bot developers to execute the \`${cmd[0].command}\` command.`);

      try {
        await cmd[0].execute(this.bot, msg, args);
      } catch(error) {
        msg.channel.send(`:x: Command \`${cmd[0].command}\` has errored, the incident has been logged.`);
        console.error(`[Command/${cmd[0].command}] Command has been errored:\n${error.stack}`);
      }
    }
  }
};