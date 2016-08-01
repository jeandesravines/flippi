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
	 * @param {Authenticator} authenticator the Authenticator for the characteristics
	 */
	constructor(uuids, authenticator) {
		super({
			uuid: uuids.services.default,
			characteristics: [
				FlipPiSpeedCharacteristic
			].map((c) => new c(uuids.characteristics, authenticator)
				.on('updateValue', (value, characteristic) => {
					super.emit('updateValue', value, characteristic);
				}))
		});
	}
}


////////////////////////////////////////////////////
////////////////////////////////////////////////////

module.exports = FlipPiService;