/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const {EventEmitter} = require('events');
const Mocker = require('../../../lib/helper/mocker');

module.exports = Mocker.create(EventEmitter, {
	setValue: () => Promise.resolve(),
	stop: () => Promise.resolve()
});