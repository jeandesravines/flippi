'use strict';

const PrimaryService = require('bleno/lib/primary-service');
const FlipPiSpeedCharacteristic = require('./flippi-speed-characteristic');
const uuids = require('./flippi-uuids');

/**
 *
 */
class FlipPiService extends PrimaryService {
    /**
     *
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