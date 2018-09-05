const { readdir } = require('fs');

module.exports = class EventRegistry {
  /**
   * Construct a new EventRegistry class
   * 
   * @param {import('../Client')} bot The bot client
   */
  constructor(bot) {
    this.bot = bot;
  }

  /**
   * Does the event
   * 
   * @param {?Object} event The event
   */
  do(event) {
    const doAsync = async(...args) => {
      try {
        await event.execute(this.bot, ...args);
      } catch(error) {
        console.error(`[${event.event}] Event has errored:\n${error.stack}`);
      }
    };

    this.bot.on(event.event, doAsync);
  }

  /**
   * Builds the events
   */
  build() {
    readdir('./events', (err, files) => {
      if (err) console.error(err.stack);
      console.info(`[Events] Loading ${files.length} events...`);
      files.forEach(f => {
        const e = require(`../../events/${f}`);
        this.do(e);
      });
    });
  }
}