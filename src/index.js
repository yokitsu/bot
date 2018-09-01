// Require dotenv so we're able to use our configuration
require('dotenv').config();

// Client imports and instantiation
import Client from './structures/Client';
const client = new Client({ 
    disableEveryone: true
}).login(process.env.TOKEN); // Finally, login!
