/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleno = require('./bleno');
const SpeedCharacteristic = require('./speed-characteristic');

/**
 * @class Service Class representing the peripheral service
 * @extends Bleno.PrimaryService
 * @extends EventEmitter
 */
class Service extends Bleno.PrimaryService {
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
				new SpeedCharacteristic(uuids.characteristics.speed, authenticator)
			]
		});


		////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////

		this.characteristics.forEach((c) => {
			c.on('updateValue', this.emit.bind(this, 'updateValue'));
		});
	}
}


module.exports = Service;