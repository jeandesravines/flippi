/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Mocker = require('../../../lib/module/mocker');


//////////////////////////////////////
//////////////////////////////////////

module.exports = Mocker.create(Object, {
	setValue: () => Promise.resolve(),
	stop: () => Promise.resolve()
});