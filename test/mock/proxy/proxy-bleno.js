/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../../../lib/module/mocker');
const noop = require('../../../lib/module/noop');


module.exports = Mocker.create(EventEmitter, {
	setServices: (services, callback) => callback(),
	startAdvertising: noop,
	stopAdvertising: noop
});