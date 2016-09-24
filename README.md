# Flippi

Skateboard Bluetooth Low Energy (BLE) controller


## Table of contents

* [Setup](#setup)
* [Usage](#usage)
* [Environment variables](#environment-variables)
    * [Channels](#channels) 
        * [Motor 1](#motor-1) 
    * [Pin](#pin)


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

#### Install dependencies

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

### Download and install

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

- Options: `CHANNEL_MOTOR_1`
- Type: `Number`
- Default: `5`
- Example: `CHANNEL_MOTOR_1=7 npm start`

### Device

The used compatible gpio's device.  
If `GPIO`, the local GPIO will be used.  
If `FIVE`, the USB connected device will be used. In this case, [Jonny Five](http://johnny-five.io/) will be used to communicate.

- Options: `DEVICE`
- Type: `String`
- Values: `GPIO` | `FIVE`
- Default: `GPIO`
- Example: `DEVICE=FIVE npm start`

### Name

The name of the application.

- Options: `NAME`
- Type: `String`
- Default: `Flippi`
- Example: `Name=Hello npm start`

### Pin

The Pin to secure the communication between the remote and the application.

- Options: `PIN`
- Type: `String`
- Default: `1234`
- Example: `PIN=2468 npm start`
