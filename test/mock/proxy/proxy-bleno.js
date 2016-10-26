/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../../../lib/helper/mocker');
const noop = require('../../../lib/helper/noop');


/**
 * ProxyBleno
 * @class ProxyBleno
 * @extends {EventEmitter}
 */
module.exports = Mocker.create(EventEmitter, {
  setServices: (services, callback) => callback(),
  startAdvertising: noop,
  stopAdvertising: noop,
});
