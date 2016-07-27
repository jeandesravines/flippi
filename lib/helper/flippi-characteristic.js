/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Characteristic = require('bleno/lib/characteristic');

/**
 * @class FlipPiCharacteristic
 * @extends Characteristic
 */
class FlipPiCharacteristic extends Characteristic {
	/**
	 * Instantiate a new FlipPiCharacteristic
	 * @override
	 * @param {Object} options
	 * @param {Authenticator} authenticator
	 */
	constructor(options, authenticator) {
		super(options);

		/**
		 * @readonly
		 * @protected
		 * @type {Authenticator}
		 */
		this._authenticator = authenticator;


		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		this.on('readRequest', this.onReadRequest.bind(this));
		this.on('writeRequest', this.onWriteRequest.bind(this));
	}

	/**
	 * Returns the Authenticator
	 * @returns {Authenticator} the Authenticator
	 */
	get authenticator() {
		return this._authenticator;
	}

	/**
	 * Handle on a read request
	 * @protected
	 * @param {int} offset
	 * @param {Function} callback
	 */
	onReadRequest(offset, callback) {
		callback(this.RESULT_SUCCESS, this.value);
	}

	/**
	 * Handle on a write request
	 * @protected
	 * @param {Buffer} data
	 * @param {int} offset
	 * @param {boolean} withoutResponse
	 * @param {Function} callback
	 */
	onWriteRequest(data, offset, withoutResponse, callback) {
		callback(this.RESULT_SUCCESS);
	}
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

module.exports = FlipPiCharacteristic;