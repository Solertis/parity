// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

export default class Keepkey {
  constructor(api) {
    this._api = api;
  }

  cancel(device_path) {
    return this._api.parity
      .keepkey("cancel", device_path)
      .then((message) => { return message })
      .catch((err) => { return err });
  }

  getDevices() {
    const self = this;
    let devices = {};
    // get standard information from each device
    return self._api.parity
      .keepkey("init")
      .then((message) => {
        message = JSON.parse(message);
        console.log("MESSAGE", message);
        message.forEach((device) => {
          devices[device.device_path] = {
            info: device.device_info
          };
        });
        return devices;
      })
      .catch((err) => {
        return err;
      });
  }

  pinMatrixAck(device_path, pin) {
    return this._api.parity
      .keepkey("pin_matrix_ack", device_path, pin)
      .then((message) => {
        // Address is returned
        console.log("MESSAGE3", message);
        return message;
      })
      .catch((err) => {
        return err;
      });
  }

  getAddress(device_path) {
    return this._api.parity
      .keepkey("get_address", device_path)
      .then((message) => {
        return message;
      })
      .catch((err) => {
        return err;
      });
  }

  signTransaction(device, transaction) {
    return this._api.parity
      .keepkey("sign_transaction", this.devices[device])
      .then((message) => {

      })
      .catch((err) => {

      });
  }
}
