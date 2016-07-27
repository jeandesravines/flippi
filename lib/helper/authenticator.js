/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');

/**
 * @class Authenticator Representing an pin code storage
 * @extends EventEmitter
 */
class Authenticator extends EventEmitter {
	/**
	 * Instantiate an Authenticator with a pin code
	 * @param {string} pin the pin code
	 */
	constructor(pin) {
		super();

		/**
		 * The pin code
		 * @private
		 * @type {string}
		 */
		this._pin = pin;
	}

	/**
	 * returns true if the argument's pin code is the authenticator's pin code
	 * @param {string} pin
	 * @returns {boolean} true is the pin code is allowed
	 */
	isAllowed(pin) {
		return String(this._pin) === String(pin);
	}
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

module.exports = Authenticator;