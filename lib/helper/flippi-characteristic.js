/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Characteristic = require('bleno/lib/characteristic');

/**
 * @class FlipPiCharacteristic
 * @extends Characteristic
 * @extends EventEmitter
 */
class FlipPiCharacteristic extends Characteristic {
	/**
	 * Instantiate a new FlipPiCharacteristic
	 * @override
	 * @param {Object} options
	 * @param {EngineController} authenticator
	 * @param {?string} value
	 */
	constructor(options, authenticator, value = '') {
		super(options);

		/**
		 * @readonly
		 * @protected
		 * @type {?string}
		 */
		this._default = Buffer.from(value);

		/**
		 * @readonly
		 * @protected
		 * @type {EngineController}
		 */
		this._authenticator = authenticator;
	}

	/**
	 * Returns the Authenticator
	 * @returns {EngineController} the Authenticator
	 */
	get authenticator() {
		return this._authenticator;
	}

	/**
	 * Update the value and emit an "updateValue" event
	 * @param {*} value
	 */
	setValue(value) {
		this.value = Buffer.from(String(value));
		this.emit('updateValue', this.value.toString(), this);
	}

	/**
	 * Returns the current value if exists and the default value else
	 * @returns {Buffer}
	 */
	getValue() {
		return this.value || this._default;
	}


	/**
	 * Handle on a read request
	 * @protected
	 * @param {int} offset
	 * @param {Function} callback
	 */
	onReadRequest(offset, callback) {
		callback(Characteristic.RESULT_SUCCESS, this.getValue());
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
		callback(Characteristic.RESULT_SUCCESS);
	}
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

module.exports = FlipPiCharacteristic;