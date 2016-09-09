# Flippi

Skateboard Bluetooth Low Energy (BLE) controller

## Setup

This application can then be installed with git:
```shell
$ git clone https://github.com/jeandesravines/flippi.git
```

## Usage

Launch automatically as sudo:

```shell
$ npm start
```

## Environment variables

Environment variables can be passed to override the default configuration.

### Motor's 1 channel

The GPIO channel for the motor 1.

- Options : `CHANNEL_MOTOR_1`
- Default : `5`
- Example : `CHANNEL_MOTOR_1=7 npm start`

### Pin

The Pin to secure the communication.

- Options : `PIN`
- Default : `1234`
- Example : `PIN=2468 npm start`
