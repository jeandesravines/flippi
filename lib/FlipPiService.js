'use strict';

/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

const PrimaryService = require('bleno/lib/primary-service');
const FlipPiSpeedCharacteristic = require('./FlipPiSpeedCharacteristic');
const uuids = require('./uuids');

/**
 * @class FlipPiService Class representing the peripheral service
 * @extends PrimaryService
 */
class FlipPiService extends PrimaryService {
	/**
	 * Instantiate the service
	 * @override
	 * @constructor
	 * @param {Authenticator} authenticator the Authenticator for the characteristics
	 */
	constructor(authenticator) {
		super({
			uuid: uuids.services.default,
			characteristics: [
				FlipPiSpeedCharacteristic
			].map((c) => {
				return new c(authenticator);
			})
		});

		this.characteristics.forEach((c) => {
			c.on('updateValue', (value, characteristic) => {
				this.emit('updateValue', value, characteristic.uuid);
			});
		});
	}
}


////////////////////////////////////////////////////
////////////////////////////////////////////////////

module.exports = FlipPiService;