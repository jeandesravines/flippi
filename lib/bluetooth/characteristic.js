/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleno = require('./bleno');

/**
 * @class Characteristic
 * @extends Bleno.Characteristic
 * @extends EventEmitter
 */
class Characteristic extends Bleno.Characteristic {
	/**
	 * Instantiate a new Characteristic
	 * @override
	 * @param {Object} options
	 * @param {FiveEngineController} authenticator
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
		 * @type {FiveEngineController}
		 */
		this._authenticator = authenticator;
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
	 * @return {Buffer} the current value or the default value
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


module.exports = Characteristic;
