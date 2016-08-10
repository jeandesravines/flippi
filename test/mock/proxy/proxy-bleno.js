/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const mocker = require('../../mock/mocker');

/**
 * @class ProxyBleno Class to proxify Bleno
 * @extends EventEmitter
 */
class ProxyBleno extends EventEmitter {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 *
	 * @param {Array} services
	 * @param {Function} callback
	 */
	setServices(services, callback) {
		callback();
	}

	/**
	 *
	 * @param {string} title
	 * @param {Array.<string>} uuids
	 */
	startAdvertising(title, uuids) {
	}

	/**
	 *
	 */
	stopAdvertising() {
	}
}

//////////////////////////////////////
//////////////////////////////////////

module.exports = ProxyBleno;