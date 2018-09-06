// Client imports and instantiation
const YokitsuClient = require('./structures/Client.js');

new YokitsuClient({ 
    disableEveryone: true
}).build(); // Build registries and log into Discord