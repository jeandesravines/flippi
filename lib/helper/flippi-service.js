/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const PrimaryService = require('bleno/lib/primary-service');
const FlipPiSpeedCharacteristic = require('./flippi-speed-characteristic');

/**
 * @class FlipPiService Class representing the peripheral service
 * @extends PrimaryService
 */
class FlipPiService extends PrimaryService {
	/**
	 * Instantiate the service
	 * @override
	 * @constructor
	 * @param {Object.<string, Object.<string, string>>} uuids all uuids
	 * @param {EngineController} authenticator the Authenticator for the characteristics
	 */
	constructor(uuids, authenticator) {
		super({
			uuid: uuids.services.default,
			characteristics: [
				FlipPiSpeedCharacteristic
			].map((c) => {
				return new c(uuids.characteristics, authenticator);
			})
		});

		this.characteristics.forEach((c) => {
			c.on('updateValue', (value, characteristic) => {
				this.emit('updateValue', value, characteristic);
			});
		});
	}
}


////////////////////////////////////////////////////
////////////////////////////////////////////////////

module.exports = FlipPiService;