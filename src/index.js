// Require dotenv so we're able to use our configuration
require('dotenv').config();

// Client imports and instantiation
import Client from './structures/Client.js';
const client = new Client({ 
    disableEveryone: true
});

// Finally, login!
client.login(process.env.TOKEN);