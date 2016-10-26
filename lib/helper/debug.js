/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const debug = require('debug');
const configuration = require('../configuration/configuration');
const NAME = configuration.name;
const namespace = NAME.toLowerCase();


module.exports = debug(namespace);
