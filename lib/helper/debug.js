/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('debug');
const configuration = require('../configuration/configuration');
const NAME = configuration.name;

if (configuration.debug) {
	debug.enable(NAME);
}

//////////////////////////////////
//////////////////////////////////

module.exports = debug(NAME);