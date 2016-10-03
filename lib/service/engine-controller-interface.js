/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const EventEmitter = require('events').EventEmitter;

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
		return this.setValue(0);
	}

	/**
	 * Set the percent of max speed of the motor
	 * @param {number} value float [0,1]
	 * @return {Promise} an empty resolved Promise
	 */
	setValue(value) {
		throw new Error('Not set yet');
	}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = EngineControllerInterface;