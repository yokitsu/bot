// Require dotenv so we're able to use our configuration
require('dotenv').config();

// Client imports and instantiation
const YokitsuClient = require('./structures/Client');
new Client({ 
    disableEveryone: true
}).login(process.env.TOKEN); // Finally, login!