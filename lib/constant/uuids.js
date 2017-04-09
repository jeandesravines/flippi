/**
 * Copyright 2017 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const UUID = require('../helper/uuid');

/**
 *
 * @type {Object.<string, string>}
 */
const uuids = Object.freeze({
  service: new UUID('637a9500-3d5a-11e6-ac61-9e71128cae77').value,
  speed: new UUID('637a9501-3d5a-11e6-ac61-9e71128cae77').value,
});


module.exports = uuids;
