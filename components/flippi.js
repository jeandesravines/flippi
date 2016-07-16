'use strict';

/**
 * Copyright 2016 Jean
 */

const Bleio = require('./bleio');
const uuids = require('./flippi-uuids');
let EngineController = require('./engine-controller');

/**
 *
 */
class FlipPi {
    /**
     *
     */
    constructor() {
        /**
         *
         * @private
         * @type {Bleio}
         */
        this.bleio = new Bleio();

        /**
         *
         * @private
         * @type {EngineController}
         */
        this.engineController = new EngineController();


        ///////////////////////////////////////
        ///////////////////////////////////////
        
        this.bleio.on('updateValue', this.onUpdateValue.bind(this));
    }

    /**
     *
     * @param {string|number} value
     * @param {string} uuid
     */
    onUpdateValue(value, uuid) {
        switch (uuid) {
            case uuids.characteristics.speed:
                this.engineController.setValue(parseFloat(value));
                break;
            default:
                break;
        }
    }
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

module.exports = FlipPi;