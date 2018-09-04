// Client to extend
const { Client } = require('discord.js');

// Command and event registries
const CommandRegistry = require('./registry/CommandRegistry.js');
const EventRegistry = require('./registry/EventRegistry.js');

// Collection for commands
const Collection = require('../util/Collection.js');

// Bot owners
const { OWNERS } = process.env;

// Class declaration
module.exports = class YokitsuClient extends Client {
  /**
   * Construct a new YokitsuClient class
   * 
   * @param {import('discord.js').ClientOptions} options The client options
   */
  constructor(options) {
    super(options);

    this.cmds = new Collection();
    this.color = 7878056;
    this.commandRegistry = new CommandRegistry(this);
    this.eventRegistry = new EventRegistry(this);
  }

  /**
   * Builds the bot then connects to Discord
   * 
   * @param {String} token The token to connect to Discord
   * @returns {Promise}
   */
  async login(token) {
    this.commandRegistry.build();
    this.eventRegistry.build();
    super.login(token)
      .then(() => console.log(`[Process ${process.pid}] Yokitsu is connecting via WS to Discord`));
  }

  /**
   * If the user has permission to use restricted commands
   * 
   * @param {String} id The user's id
   * @returns {Boolean}
   */
  getOP(id) {
    return OWNERS.split(',').includes(id);
  }
};