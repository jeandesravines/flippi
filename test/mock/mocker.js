/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

module.exports = (prototype, properties = {}) => {
	return Object.create(prototype, Object.keys(properties).reduce((handler, key) => {
		return Object.assign(handler, {
			[key]: {
				value: properties[key],
				writable: true
			}
		});
	}));
};