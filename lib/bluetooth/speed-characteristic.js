/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {Buffer} = require('buffer');
const Catcher = require('@jdes/catcher');
const Mutex = require('@jdes/mutex');
const Bleno = require('./bleno');
const Characteristic = require('./characteristic');

/**
 * @class SpeedCharacteristic Representing the characteristic for the motor speed
 * @extends Characteristic
 */
class SpeedCharacteristic extends Characteristic {
	/**
	 * Instantiate a SpeedCharacteristic
	 * @constructor
	 * @override
	 * @param {string} uuid
	 * @param {Authenticator} authenticator
	 */
	constructor(uuid, authenticator) {
		super({
			uuid: uuid,
			properties: ['read', 'write', 'notify'],
			descriptors: [
				new Bleno.Descriptor({
					uuid: '2901',
					value: 'Speed'
				})
			]
		}, authenticator, '0');

		/**
		 * The mutex to delayed requests
		 * @private
		 * @type {Mutex}
		 */
		this._mutex = new Mutex();

		/**
		 * The timeout set to reset the value
		 * @private
		 * @type {?number}
		 */
		this._timeout = null;

		/**
		 * Time (in ms) before reset speed
		 * @private
		 * @type {number}
		 */
		this._delayReset = 1000;

		/**
		 * The minimum time between 2 requests
		 * @private
		 * @type {number}
		 */
		this._delayRequest = 100;
	}

	/**
	 * Handle on write requests
	 * @protected
	 * @override
	 * @param {Buffer} data
	 * @param {int} offset
	 * @param {boolean} withoutResponse
	 * @param {Function} callback
	 */
	onWriteRequest(data, offset, withoutResponse, callback) {
		const raw = data instanceof Buffer ? data.toString() : null;
		const content = raw && Catcher.resolve(() => JSON.parse(raw)) || {};

		new Promise((resolve, reject) => this._authenticator.isAllowed(content.pin) ? resolve() : reject())
			.then(() => this._mutex.delayed(this._delayRequest))
			.then(() => {
				clearTimeout(this._timeout);

				this.setValue(content.data);
				this._timeout = setTimeout(() => {
					this.setValue(0);
				}, this._delayReset);
			})
			.then(() => callback(this.RESULT_SUCCESS))
			.catch(() => callback(this.RESULT_UNLIKELY_ERROR));
	}

	/**
	 * Set the current value
	 * @override
	 * @param {string|number} value
	 */
	setValue(value) {
		super.setValue(Number.parseFloat(value) || 0);
	}
}


module.exports = SpeedCharacteristic;