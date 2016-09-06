/**
 * Copyright 2016 Jean Desravines <hi@jeandesravines.com>
 */

'use strict';

const FlipPi = require('./lib/service/flippi');
const flippi = new FlipPi();

////////////////////////////////////////////////////
////////////////////////////////////////////////////

process.on('exit', flippi.stop.bind(flippi));