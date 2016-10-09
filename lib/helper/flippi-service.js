/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const PrimaryService = require('bleno/lib/primary-service');
const FlipPiSpeedCharacteristic = require('./flippi-speed-characteristic');

/**
 * @class FlipPiService Class representing the peripheral service
 * @extends PrimaryService
 * @extends EventEmitter
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
			uuid: uuids.services.flippi,
			characteristics: [
				new FlipPiSpeedCharacteristic(uuids.characteristics, authenticator)
			]
		});


		////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////

		this.characteristics.forEach((c) => {
			c.on('updateValue', this.emit.bind(this, 'updateValue'));
		});
	}
}


module.exports = FlipPiService;