/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

/**
 * @class UUID class representing an UUID value
 */
class UUID {
	/**
	 * Instantiate an UUID
	 * @constructor
	 * @param {string} uuid the UUID string representation
	 */
	constructor(uuid) {
		if (/^[a-f\d-]+$/i.test(uuid.toLowerCase()) === false) {
			throw new TypeError(`${uuid} is not an UUID`);
		}

		/**
		 * The UUID string representation without non-alphanumeric characters
		 * @type {string}
		 * @private
		 */
		this._value = uuid.replace(/\W/g, '').toLowerCase();
	}

	/**
	 * The UUID string representation without non-alphanumeric characters
	 * @returns {string}
	 */
	get value() {
		return this._value;
	}
}


module.exports = UUID;