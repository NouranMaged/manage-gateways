import Devices from "../api/devicesApis";

var DevicesController = {};

DevicesController.getAllDevices = () => {
  return new Promise(function (resolve) {
    Devices.getAllDevices()
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed !";
            if (data && data.status && data.status.message) {
              errorMessage = data.status.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        resolve({
          data: data,
        });
      })
      .catch((error) => {
        resolve({
          errorMsg: error,
        });
      });
  });
};
DevicesController.addDevice = (queryData) => {
  return new Promise(function (resolve) {
    Devices.addDevice(queryData)
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed !";
            if (data && data.status && data.status.message) {
              errorMessage = data.status.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        resolve({
          data: data,
        });
      })

      .catch((error) => {
        resolve({
          errorMsg: error,
        });
      });
  });
};

DevicesController.deleteDevice = (queryData) => {
  return new Promise(function (resolve) {
    Devices.deleteDevice(queryData)
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed !";
            if (data && data.status && data.status.message) {
              errorMessage = data.status.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        resolve({
          data: data,
        });
      })

      .catch((error) => {
        resolve({
          errorMsg: error,
        });
      });
  });
};

export default DevicesController;
