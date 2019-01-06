require('dotenv').config({ path: '../.env' });
import YokitsuClient from './structures/client';

new YokitsuClient()
    .start();