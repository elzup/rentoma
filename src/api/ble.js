// @flow

// respect https://github.com/electricbaka/bluejelly

class BlueJelly {
  onRead: Function

  bluetoothDevice: any
  dataCharacteristic: any
  hashUUID: any
  hashUUIDLast: any
  callbacks: {
    onScan: (deviceName: string) => void,
    onConnectGATT: (uuid: string) => void,
    onWrite: (uuid: string) => void,
    onStartNotify: (uuid: string) => void,
    onStopNotify: (uuid: string) => void,
    onDisconnect: () => void,
    onClear: () => void,
    onReset: () => void,
    onError: (error: any) => void,
  }

  constructor({ onRead }: { onRead: Function }) {
    this.onRead = onRead

    this.bluetoothDevice = null
    this.dataCharacteristic = null
    this.hashUUID = {}
    this.hashUUIDLast = ''

    //callBack
    this.callbacks = {
      ...{
        onScan: deviceName => {
          console.log('onScan')
        },
        onConnectGATT: uuid => {
          console.log('onConnectGATT')
        },
        onWrite: uuid => {
          console.log('onWrite')
        },
        onStartNotify: uuid => {
          console.log('onStartNotify')
        },
        onStopNotify: uuid => {
          console.log('onStopNotify')
        },
        onDisconnect: () => {
          console.log('onDisconnect')
        },
        onClear: () => {
          console.log('onClear')
        },
        onReset: () => {
          console.log('onReset')
        },
        onError: error => {
          console.log('onError')
        },
      },
    }
  }
  setUUID(name: string, serviceUUID: string, characteristicUUID: string) {
    this.hashUUID[name] = {
      serviceUUID: serviceUUID,
      characteristicUUID: characteristicUUID,
    }
  }
  scan(uuid: string) {
    return (this.bluetoothDevice
      ? Promise.resolve()
      : this.requestDevice(uuid)
    ).catch(error => {
      this.callbacks.onError(error)
    })
  }
  requestDevice(uuid: string) {
    return window.navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [this.hashUUID[uuid].serviceUUID],
      })
      .then(device => {
        this.bluetoothDevice = device
        this.bluetoothDevice.addEventListener(
          'gattserverdisconnected',
          this.callbacks.onDisconnect,
        )
        this.callbacks.onScan(this.bluetoothDevice.name)
      })
  }
  connectGATT(uuid: string) {
    if (!this.bluetoothDevice) {
      var error = 'No Bluetooth Device'
      this.callbacks.onError(error)
      return
    }
    if (this.bluetoothDevice.gatt.connected && this.dataCharacteristic) {
      if (this.hashUUIDLast === uuid) return Promise.resolve()
    }
    this.hashUUIDLast = uuid

    return this.bluetoothDevice.gatt
      .connect()
      .then(server => {
        return server.getPrimaryService(this.hashUUID[uuid].serviceUUID)
      })
      .then(service => {
        return service.getCharacteristic(this.hashUUID[uuid].characteristicUUID)
      })
      .then(characteristic => {
        this.dataCharacteristic = characteristic
        this.dataCharacteristic.addEventListener(
          'characteristicvaluechanged',
          this.dataChanged(this, uuid),
        )
        this.callbacks.onConnectGATT(uuid)
      })
      .catch(error => {
        this.callbacks.onError(error)
      })
  }

  dataChanged(self: BlueJelly, uuid: string) {
    return (event: any) => {
      self.onRead(event.target.value, uuid)
    }
  }

  read(uuid: string) {
    return this.scan(uuid)
      .then(() => {
        return this.connectGATT(uuid)
      })
      .then(() => {
        return this.dataCharacteristic.readValue()
      })
      .catch(error => {
        this.callbacks.onError(error)
      })
  }

  write(uuid: string, array: any[]) {
    return this.scan(uuid)
      .then(() => {
        return this.connectGATT(uuid)
      })
      .then(() => {
        const data = Uint8Array.from(array)
        return this.dataCharacteristic.writeValue(data)
      })
      .then(() => {
        this.callbacks.onWrite(uuid)
      })
      .catch(error => {
        this.callbacks.onError(error)
      })
  }

  startNotify(uuid: string) {
    return this.scan(uuid)
      .then(() => {
        return this.connectGATT(uuid)
      })
      .then(() => {
        this.dataCharacteristic.startNotifications()
      })
      .then(() => {
        this.callbacks.onStartNotify(uuid)
      })
      .catch(error => {
        this.callbacks.onError(error)
      })
  }

  stopNotify(uuid: string) {
    return this.scan(uuid)
      .then(() => {
        return this.connectGATT(uuid)
      })
      .then(() => {
        this.dataCharacteristic.stopNotifications()
      })
      .then(() => {
        this.callbacks.onStopNotify(uuid)
      })
      .catch(error => {
        this.callbacks.onError(error)
      })
  }

  disconnect() {
    if (!this.bluetoothDevice) {
      var error = 'No Bluetooth Device'
      this.callbacks.onError(error)
      return
    }

    if (this.bluetoothDevice.gatt.connected) {
      this.bluetoothDevice.gatt.disconnect()
    } else {
      const error = 'Bluetooth Device is already disconnected'
      this.callbacks.onError(error)
      return
    }
  }

  clear() {
    this.bluetoothDevice = null
    this.dataCharacteristic = null
    this.callbacks.onClear()
  }

  async reset() {
    await this.disconnect() //disconnect() is not Promise Object
    this.clear()
    this.callbacks.onReset()
  }
}

export default BlueJelly
