module.exports = {
  event: 'ready',
  execute: (bot) => {
    console.info(`[${bot.user.tag}] Yokitsu has established connection to Discord`);
    bot.user.setActivity(`${bot.config.prefix}help | ${bot.guilds.size} guild${bot.guilds.size > 1 ? 's' : ''}`);
  }
}
