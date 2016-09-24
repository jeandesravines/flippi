# Flippi

Skateboard Bluetooth Low Energy (BLE) controller


## Table of contents

* [Setup](#setup)
* [Usage](#usage)
* [Environment variables](#environment-variables)


## Setup

### Environment

This application was created for Raspberry 2 B+ on Raspbian and developed on macOS.
It was tested on:
- Raspbian (Production)
- macOS 10.12 (Development + Test)
- Ubuntu 14.04 (Development + Test)
- Debian (Test)

### Dependencies

- nodejs (>= 6.0.0)
- git
- bluetooth
- bluez
- libbluetooth-dev
- libudev-dev

### Install the dependencies

```shell
# Node.js v6
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs npm build-essential

# Dependencies
sudo apt-get update
sudo apt-get install -y git bluetooth bluez libbluetooth-dev libudev-dev

# Config
sudo 'Flippi' > /etc/hostname
```

### Install the application

This application can then be installed with git and npm:
```shell
git clone https://github.com/jeandesravines/flippi.git
cd flippi
npm install
```


## Usage

### Start

Launch as sudo:

```shell
sudo npm start
```

### Test

Launch Unit tests as sudo:

```shell
sudo npm test
```

Launch E2E tests as sudo:

```shell
sudo npm run test-e2e
```
 

## Environment variables

Environment variables can be passed to override the default configuration.

### Channels

GPIO channels' settings.

#### Motor 1

The GPIO channel for the motor 1.

- Options: `FLIPPI_CHANNEL_MOTOR_1`
- Type: `Number`
- Default: `5`

Example: 

```shell
FLIPPI_CHANNEL_MOTOR_1=7 npm start
```

### Device

The used compatible gpio's device.  

- Options: `FLIPPI_DEVICE`
- Type: `String`
- Values: `GPIO` | `FIVE`
- Default: `GPIO`

Example: 

```shell
FLIPPI_DEVICE=FIVE npm start
```

#### Roles

- `GPIO`: The local Raspberry's GPIO  
- `FIVE`: An USB connected device connected to the Raspberry. In this case, [Jonny Five](http://johnny-five.io/) will be used to communicate.


### Environment

The execution development

- Options: `NODE_ENV`
- Type: `String`
- Values: `debug` | `production` | `test`
- Default: `debug`

Example: 

```shell
NODE_ENV=debug npm start
```


### Name

The name of the application.

- Options: `FLIPPI_NAME`
- Type: `String`
- Default: `Flippi`

Example: 

```shell
FLIPPI_NAME=Hello npm start
```

### Pin

The Pin to secure the communication between the remote and the application.

- Options: `FLIPPI_PIN`
- Type: `String`
- Default: `1234`

Example: 

```shell
FLIPPI_PIN=2468 npm start
```
