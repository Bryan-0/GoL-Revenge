'use strict';

// TODO: No globals.
global.Config = require('./config/config.js');
global.Users = require('./classes/users.js');
// Hey, make a server class that accepts config as a parameter. Users... We'll talk later about users.
require('./server.js');
console.log('Game server is set up!');
