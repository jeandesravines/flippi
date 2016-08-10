/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');

/**
 * @class ProxyGpio Class to proxify Gpio
 * @extends EventEmitter
 */
class ProxyGpio extends EventEmitter {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 *
	 * @returns {Promise}
	 */
	setAnalogValue() {
		return Promise.resolve();
	}

	/**
	 *
	 * @param {number} channel
	 * @returns {Promise}
	 */
	open(channel) {
		if (channel < 0) {
			throw 'UnknownChannelError';
		}

		return Promise.resolve();
	}
}

//////////////////////////////////////
//////////////////////////////////////

module.exports = ProxyGpio;