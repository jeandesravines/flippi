'use strict';

const Descriptor = require('bleno/lib/descriptor');
const {Buffer} = require('buffer');
const PromisedMutex = require('jdes-mutex');
const FlipPiCharacteristic = require('./flippi-characteristic');
const uuids = require('./flippi-uuids');

/**
 *
 */
class FlipPiSpeedCharacteristic extends FlipPiCharacteristic {
    /**
     *
     */
    constructor(authenticator) {
        super({
            uuid: uuids.characteristics.speed,
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
         * @type {PromisedMutex}
         */
        this._mutex = new PromisedMutex();

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
     * @private
     * @param {Buffer} data
     * @param {int} offset
     * @param {boolean} withoutResponse
     * @param {Function} callback
     */
    onWriteRequest(data, offset, withoutResponse, callback) {
        const jsonData = JSON.parse(data.toString()) || {};

        if (this.authenticator.isAllowed(jsonData.pin)) {
            this._mutex.delayed(this._delayRequest)
                .then(() => {
                    clearTimeout(this._timeout);

                    this.setValue(jsonData.data);
                    this._timeout = setTimeout(() => {
                        this.setValue(0);
                    }, this._delayReset);
                });

            callback(super.RESULT_SUCCESS);

        } else {
            callback(super.RESULT_UNLIKELY_ERROR)
        }
    }

    /**
     * Set the current value
     * @private
     * @param {number} speed
     */
    setValue(speed) {
        const value = String(parseFloat(speed) || 0);

        this.value = Buffer.from(value);
        this.emit('updateValue', value, this);
    }
}


///////////////////////////////////////////
///////////////////////////////////////////

module.exports = FlipPiSpeedCharacteristic;