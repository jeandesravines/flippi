/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');

/**
 * @class EngineControllerInterface
 * @extends EventEmitter
 */
class EngineControllerInterface extends EventEmitter {
	/**
	 *
	 * @param {Number} channel
	 */
	constructor(channel) {
		super();

		/**
		 * Channel index
		 * @readonly
		 * @type {number}
		 */
		this._channel = channel;
	}

	/**
	 * Stop process
	 * @returns {Promise}
	 */
	stop() {
		throw new Error('Not set yet');
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float [0,1]
	 * @return {Promise} an empty resolved Promise
	 */
	setValue() {
		throw new Error('Not set yet');
	}
}

module.exports = EngineControllerInterface;