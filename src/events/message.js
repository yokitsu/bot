module.exports = {
  event: 'message',
  execute: (bot, message) => {
    bot.commandRegistry.handleCommand(message);
  }
};