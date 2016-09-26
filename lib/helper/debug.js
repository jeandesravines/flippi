/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('debug');
const configuration = require('../configuration/configuration');
const namespace = configuration.name.toLowerCase();

if (configuration.debug) {
	debug.enable(namespace);
}

//////////////////////////////////
//////////////////////////////////

module.exports = debug(namespace);