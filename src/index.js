// Require dotenv so we're able to use our configuration
require('dotenv').config();

// Grab the token
const { TOKEN } = process.env;

// Client imports and instantiation
const YokitsuClient = require('./structures/Client.js');
new YokitsuClient({ 
    disableEveryone: true
}).login(TOKEN); // Finally, login!