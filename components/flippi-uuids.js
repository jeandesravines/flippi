'use strict';

/**
 * Copyright 2016 Jean
 */

const UUID = require('./uuid');

module.exports = Object.freeze({
    services: {
        default: new UUID('637a9500-3d5a-11e6-ac61-9e71128cae77').value
    },
    characteristics: {
        speed: new UUID('637a9501-3d5a-11e6-ac61-9e71128cae77').value
    }
});