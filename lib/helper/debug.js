/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('debug');
const configuration = require('../configuration/configuration');
const noop = require('../helper/noop');

const namespace = configuration.name.toLowerCase();
const handler = configuration.debug ? debug(namespace) : noop;


module.exports = handler;
