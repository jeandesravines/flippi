/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * Representing an pin code storage
 * @class FiveEngineController
 */
class Authenticator {
	/**
	 * Instantiate an Authenticator with a pin code
	 * @param {string} [pin] the pin code
	 */
	constructor(pin = '') {
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
	 * @return {boolean} true is the pin code is allowed
	 */
	isAllowed(pin) {
		return this._pin === pin;
	}
}


module.exports = Authenticator;
