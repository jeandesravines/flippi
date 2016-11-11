/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const Bleno = require('bleno/lib/bleno');

Bleno.Characteristic = Bleno.prototype.Characteristic;
Bleno.Descriptor = Bleno.prototype.Descriptor;
Bleno.PrimaryService = Bleno.prototype.PrimaryService;


module.exports = Bleno;
