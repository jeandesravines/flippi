/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../helper/mocker');


/**
 * ProxyEngineController
 * @class ProxyEngineController
 * @extends {EventEmitter}
 */
module.exports = Mocker.create(EventEmitter, {
  setValue: () => Promise.resolve(),
  stop: () => Promise.resolve(),
});
