module.exports = {
  event: 'ready',
  execute: (bot) => {
    console.info(`[${bot.user.tag}] Yokitsu has established connection to Discord.`);
    bot.user.setActivity(`${process.env.PREFIX}help || ${bot.guilds.size} Guild${bot.guilds.size > 1 ? "s" : ""}`);
  }
};