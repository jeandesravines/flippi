/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../helper/mocker');
const noop = require('../helper/noop');


/**
 * ProxyManager
 * @class ProxyManager
 * @extends {EventEmitter}
 */
module.exports = Mocker.create(EventEmitter, {
  stop: noop,
});
