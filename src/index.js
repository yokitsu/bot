// Require dotenv so we're able to use our configuration
require('dotenv').config();

// Client imports and instantiation
const YokitsuClient = require('./structures/Client.js');
new YokitsuClient({ 
    disableEveryone: true
}).build(process.env.TOKEN); // Finally, login!
