/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../helper/mocker');


/**
 * ProxyGpio
 * @class ProxyGpio
 * @extends {EventEmitter}
 */
module.exports = Mocker.create(EventEmitter, {
  setAnalogValue: () => Promise.resolve(),
  close: () => Promise.resolve(),
  open: (channel) => new Promise((resolve, reject) => {
    if (channel < 0) {
      reject(new Error('UnknownChannelError'));
    } else {
      resolve();
    }
  }),
});
