'use strict';

/**
 * Copyright 2016 Jean
 */

const {EventEmitter} = require('events');

/**
 *
 */
class Authenticator extends EventEmitter {
    /**
     *
     * @param {string} pin
     */
    constructor(pin) {
        super();

        /**
         *
         * @private
         * @type {string}
         */
        this.pin = pin;
    }

    /**
     *
     * @param {string} pin
     * @returns {boolean}
     */
    isAllowed(pin) {
        return this.pin === pin;
    }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

module.exports = Authenticator;