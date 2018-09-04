const { readdir, readdirSync } = require('fs');

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
};