'use strict';

/**
 * Copyright 2016 Jean
 */

class UUID {
    /**
     *
     * @param {string} uuid
     */
    constructor(uuid) {
        /**
         * @type {string}
         * @private
         */
        this._value = uuid.replace(/\W/g, '');
    }

    /**
     * The UUID without non-alphanumeric characters
     * @returns {string}
     */
    get value() {
        return this._value;
    }
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////

module.exports = UUID;