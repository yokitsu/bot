// Client to extend
const { Client } = require('discord.js');

// Command and event registries
const CommandRegistry = require('./registry/CommandRegistry.js');
const EventRegistry = require('./registry/EventRegistry.js');

// Collection for commands
const Collection = require('../util/Collection.js');

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
    this.config = require('../config.json');
  }

  /**
   * Builds the bot then connects to Discord
   * 
   * @returns {Promise}
   */
  async build() {
    this.commandRegistry.build();
    this.eventRegistry.build();
    super.login(this.config.token);
  }

  /**
   * If the user has permission to use restricted commands
   * 
   * @param {String} id The user's id
   * @returns {Boolean}
   */
  getOP(id) {
    return ['280158289667555328', '229552088525438977'].includes(id);
  }
};