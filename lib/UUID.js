'use strict';

/**
 * Copyright 2016 Jean Desravines
 */

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
		/**
		 * The UUID string representation without non-alphanumeric characters
		 * @type {string}
		 * @private
		 */
		this._value = uuid.replace(/\W/g, '');
	}

	/**
	 * The UUID string representation without non-alphanumeric characters
	 * @returns {string}
	 */
	get value() {
		return this._value;
	}
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////

module.exports = UUID;