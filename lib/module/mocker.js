/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

class Mocker {
	/**
	 * Create an object with prototype and properties
	 * @param {Object} parent
	 * @param {Object} [properties]
	 * @static
	 * @return {Object}
	 */
	static create(parent = Object, properties = {}) {
		const Mocked = function Mocked() {};
		const keys = Object.keys(properties);

		Mocked.prototype = Object.create(parent.prototype, keys.reduce((result, key) => {
			return Object.assign(result, {
				[key]: {
					value: properties[key],
					writable: true
				}
			});
		}, {}));

		return Mocked;
	}
}

////////////////////////////////////////////
////////////////////////////////////////////

module.exports = Mocker;