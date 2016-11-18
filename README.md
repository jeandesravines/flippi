# Flippi

Skateboard Bluetooth Low Energy (BLE) controller using [bleno](https://github.com/sandeepmistry/bleno)


## Table of contents

* [Setup](#setup)
* [Usage](#usage)
* [Environment variables](#environment-variables)


## Setup

### Environment

This application was created for Raspberry 2 B+ on Raspbian and developed on macOS.  
It was tested on:
- Raspbian 8.0 Jessie (Production)
- macOS 10.12 (Development + Test)
- Ubuntu 14.04 (Development + Test)
- Ubuntu 12.04 (Test)

### Dependencies

- nodejs >= 6.x
- bluetooth
- bluez <= 4.x
- libbluetooth-dev
- libudev-dev
- git

### Install the dependencies

```shell
# Prerequisites
sudo systemctl stop bluetooth

# Install dependencies
sudo apt-get update
sudo apt-get install -y git nodejs build-essential
sudo apt-get install -y bluetooth libbluetooth-dev libudev-dev libdbus-1-dev libglib2.0-dev
sudo apt-get install -y libcap2-bin

# Downgrade bluez
# Download
wget https://www.kernel.org/pub/linux/bluetooth/bluez-4.101.tar.xz
tar xfv bluez-4.101.tar.xz
cd bluez-4.101
# Install
sudo ./configure && make && make install
cd ..
rm -r bluez-4.101
```

### Install the application

This application can then be installed with git and npm:
```shell
# Install app from git
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

Launch unit tests:

```shell
npm run test:unit
```

Launch service tests:

```shell
npm run test:service
```
 

## Environment variables

Environment variables can be passed to override the default configuration.

### Channels

GPIO channels' settings.

#### Motor

The GPIO channel for the motor.

- Options: `FLIPPI_CHANNEL_0`
- Type: `Number`
- Default: `5`

Example: 

```shell
sudo FLIPPI_CHANNEL_0=7 npm start
```

### Device

The used compatible gpio's device.  

- Options: `FLIPPI_DEVICE`
- Type: `String`
- Values: `gpio` | `five`
- Default: `five`

Example: 

```shell
sudo FLIPPI_DEVICE=gpio npm start
```

#### Roles

- `gpio`: The local Raspberry's GPIO.  In this case, [@jdes/gpio](https://github.com/jeandesravines/gpio) will be used.
- `five`: An USB connected device connected to the Raspberry. In this case, [Jonny Five](http://johnny-five.io/) will be used.


### Debug

Indicate if the application use the module `debug`.

- Options: `DEBUG`
- Type: `String` | `undefined`
- Values: `flippi` | `*` | `undefined`
- Default: `undefined`

Example: 

```shell
sudo DEBUG=flippi npm start
```

### Name

The name of the application.  
This option will automatically set the `BLENO_DEVICE_NAME` with the same value.

- Options: `FLIPPI_NAME`
- Type: `String`
- Default: `Flippi`

Example: 

```shell
sudo FLIPPI_NAME=Hello npm start
```

### Pin

The Pin to secure the communication between the remote and the application.

- Options: `FLIPPI_PIN`
- Type: `String`
- Default: `1234`

Example: 

```shell
sudo FLIPPI_PIN=2468 npm start
```

### Bluetooth Advertising interval (bleno)

A custom advertising interval in ms.  
Advertising intervals must be between 20ms to 10000ms.


- Options: `BLENO_ADVERTISING_INTERVAL`
- Type: `Number`
- Default: `500`

Example: 

```shell
sudo BLENO_ADVERTISING_INTERVAL=200 npm start
```
