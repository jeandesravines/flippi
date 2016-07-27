'use strict';

/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

const UUID = require('./UUID');

/**
 *
 * @type {Object.<string, Object.<string, string>>}
 */
const uuids = {
	services: {
		default: new UUID('637a9500-3d5a-11e6-ac61-9e71128cae77').value
	},
	characteristics: {
		speed: new UUID('637a9501-3d5a-11e6-ac61-9e71128cae77').value
	}
};


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

module.exports = uuids;