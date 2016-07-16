'use strict';

/**
 * Copyright 2016 Jean
 */

const Characteristic = require('bleno/lib/characteristic');

/**
 *
 */
class FlipPiCharacteristic extends Characteristic {
    /**
     *
     * @param {Object} options
     * @param {Authenticator} authenticator
     */
    constructor(options, authenticator) {
        super(options);

        /**
         * @readonly
         * @type {Authenticator}
         */
        this.authenticator = authenticator;


        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////

        this.on('readRequest', this.onReadRequest.bind(this));
        this.on('writeRequest', this.onWriteRequest.bind(this));
    }

    /**
     *
     * @param {int} offset
     * @param {Function} callback
     */
    onReadRequest(offset, callback) {
        callback(this.RESULT_SUCCESS, this.value);
    };

    /**
     *
     * @param {Buffer} data
     * @param {int} offset
     * @param {boolean} withoutResponse
     * @param {Function} callback
     */
    onWriteRequest(data, offset, withoutResponse, callback) {
        callback(this.RESULT_SUCCESS);
    }
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

module.exports = FlipPiCharacteristic;