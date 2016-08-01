/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Descriptor = require('bleno/lib/descriptor');
const Characteristic = require('bleno/lib/characteristic');
const {Buffer} = require('buffer');
const Mutex = require('@jdes/mutex');
const FlipPiCharacteristic = require('./flippi-characteristic');

/**
 * @class FlipPiSpeedCharacteristic Representing the characteristic for the motor speed
 * @extends FlipPiCharacteristic
 */
class FlipPiSpeedCharacteristic extends FlipPiCharacteristic {
	/**
	 * Instantiate a FlipPiSpeedCharacteristic
	 * @override
	 * @param {Object.<string, string>} uuids
	 * @param {Authenticator} authenticator
	 */
	constructor(uuids, authenticator) {
		super({
			uuid: uuids.speed,
			properties: ['read', 'write'],
			secure: ['read', 'write'],
			descriptors: [
				new Descriptor({
					uuid: '2901',
					value: 'Speed'
				})
			]
		}, authenticator);

		/**
		 * The mutex to delayed requests
		 * @private
		 * @type {Mutex}
		 */
		this._mutex = new Mutex();

		/**
		 * The timeout set to reset the value
		 * @private
		 * @type {null|Number}
		 */
		this._timeout = null;

		/**
		 *
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
		const content = data instanceof Buffer ? JSON.parse(data.toString()) : null;

		if (content && this.authenticator.isAllowed(content.pin)) {
			this._mutex.delayed(this._delayRequest)
				.then(() => {
					clearTimeout(this._timeout);

					this.setValue(content.data);
					this._timeout = setTimeout(() => {
						this.setValue(0);
					}, this._delayReset);
				})
				.then(() => {
					callback(Characteristic.RESULT_SUCCESS)
				})
				.catch(() => {
					callback(Characteristic.RESULT_UNLIKELY_ERROR)
				});

		} else {
			callback(Characteristic.RESULT_UNLIKELY_ERROR)
		}
	}

	/**
	 * Set the current value
	 * @param {number} value
	 */
	setValue(value) {
		super.setValue(Number.parseFloat(String(value || '0')))
	}
}


///////////////////////////////////////////
///////////////////////////////////////////

module.exports = FlipPiSpeedCharacteristic;