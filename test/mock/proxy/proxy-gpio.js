/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../../../lib/helper/mocker');


module.exports = Mocker.create(EventEmitter, {
	setAnalogValue: () => Promise.resolve(),
	close: () => Promise.resolve(),
	open: (channel) => {
		if (channel < 0) {
			return Promise.reject(new Error('UnknownChannelError'));
		}

		return Promise.resolve();
	},
});
