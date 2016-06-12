'use strict';

// TODO: No globals.
global.Config = require('./config/config.js');
global.Users = require('./classes/users.js');
require('./server.js');
console.log('Game server is set up!');
