/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('debug');
const configuration = require('../configuration/configuration');

const namespace = configuration.name.toLowerCase();
const handler = debug(namespace);

handler.enabled = configuration.debug;


module.exports = handler;
