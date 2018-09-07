const { escapeRegExp } = require('../util/Util.js');

module.exports = {
  event: 'message',
  execute: async (bot, msg) => {
    if (msg.author.bot) return;

    const prefix = new RegExp(`^<@${bot.user.id}> |^${escapeRegExp(bot.config.prefix)}`)
      .exec(msg.content);

    if (!prefix) return;

    const args = msg.content.slice(prefix[0].length).trim().split(/ +/g),
          command = args.shift(),
          cmd = bot.cmds.filter(c => c.command === command || c.aliases.includes(command));

    if (cmd.length > 0) {
      if (cmd[0].config.guildOnly && msg.channel.type === 'dm') return msg.channel.send(`:x: You must be in a guild to execute the \`${cmd[0].help.command}\` command`);
      if (cmd[0].config.ownerOnly && !bot.getOP(msg.author.id)) return msg.channel.send(`:x: You must be a developer to execute the \`${cmd[0].help.command}\` command`);

      try {
        await cmd[0].execute(bot, msg, args);
      } catch(error) {
        msg.channel.send(`:x: Command \`${cmd[0].help.command}\` has errored, the incident has been logged`);
        console.error(`[${cmd[0].help.command}] Command has been errored:\n${error.stack}`);
      }
    }
  }
}
