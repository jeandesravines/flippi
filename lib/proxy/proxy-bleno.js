/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../helper/mocker');
const noop = require('../helper/noop');


/**
 * ProxyBleno
 * @class ProxyBleno
 * @extends {EventEmitter}
 */
module.exports = Mocker.create(EventEmitter, {
  setServices: (services, callback) => {
    services && services[0] ? callback() : callback(new Error());
  },
  startAdvertising: noop,
  stopAdvertising: noop,
});
