module.exports = {
  command: 'ping',
  description: 'Grabs Yokitsu\'s latency.',
  syntax: 'ping',
  disabled: false,
  ownerOnly: false,
  guildOnly: false,
  aliases: ['pong'],
  execute: (bot, msg) => {
    msg.channel.send(':ping_pong: Pong?')
      .then(m => {
        const timestamp = Math.round(m.createdTimestamp - msg.createdTimestamp);
        const ws = Math.round(bot.ping);

        m.edit(`:ping_pong: Pong!\n**WS**: \`${ws}ms\` | **Message**: \`${timestamp}ms\``);
      });
  }
};