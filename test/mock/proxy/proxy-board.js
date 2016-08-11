/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const mocker = require('../../mock/mocker');


/**
 * @class ProxyBoard Class to proxify Board
 * @extends EventEmitter
 */
class ProxyBoard extends EventEmitter {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 *
	 * @param {number }channel
	 * @param {number} value
	 * @returns {Promise}
	 */
	analogWrite(channel, value) {
		return Promise.resolve({channel, value});
	}

	/**
	 *
	 * @param {number} channel
	 * @param {string} mode
	 * @returns {Promise}
	 */
	pinMode(channel, mode) {
		return Promise.resolve({channel, mode});
	}
}

//////////////////////////////////////
//////////////////////////////////////

module.exports = ProxyBoard;