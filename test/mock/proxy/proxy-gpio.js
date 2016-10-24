/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../../../lib/helper/mocker');


module.exports = Mocker.create(EventEmitter, {
	setAnalogValue: () => Promise.resolve(),
	close: () => Promise.resolve(),
	open: (channel) => channel >= 0 ? Promise.resolve() : Promise.reject(new Error('UnknownChannelError')),
});
