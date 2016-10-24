/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const UUID = require('../helper/uuid');

/**
 *
 * @type {Object.<string, Object.<string, string>>}
 */
const uuids = {
	services: {
		flippi: new UUID('637a9500-3d5a-11e6-ac61-9e71128cae77').value,
	},
	characteristics: {
		speed: new UUID('637a9501-3d5a-11e6-ac61-9e71128cae77').value,
	},
};


module.exports = uuids;
