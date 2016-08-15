/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';


////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Execute the function surrounded with try/catch block and return its result.
 * If the function throw an error, undefined will be returned
 * @param {function} fn the function to execute between try/catch block
 * @param {*} [defaults] the default value
 * @returns {*|undefined} the value returned by fn or undefined if it fails
 */
module.exports = function catcher(fn, defaults = undefined) {
	let result = defaults;

	try {
		result = fn();
	} catch (error) {
		// noop
	}

	return result;
};