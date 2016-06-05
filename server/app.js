'use strict';

// 1. Load configuration, if necessary.

// 2. Load game classes and set up the game manager.

// FIXME: Tiene que haber una forma mejor de plantar un mapa de usuarios y pasarlo por los sitios sin tener que hacer esto.
// (Ver el porqué en server.js)
global.Users = require('./users.js');

// This module sets up the HTTP and WS server.
// Aditionally, the WS set up ties the message receiving parsing with the proper game engine.
require('./server.js');

console.log('Game server is set up!');
