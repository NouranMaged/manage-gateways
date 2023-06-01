import Devices from "../api/devicesApis";

var DevicesController = {};

DevicesController.getAllDevices = () => {
  return new Promise(function (resolve) {
    Devices.getAllDevices()
      .then((res) => {
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
          data: [],
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
          data: [],
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
          data: [],
          errorMsg: error,
        });
      });
  });
};

// DevicesController.getSingleGate = (id) => {
//   return new Promise(function (resolve) {
//     Devices.getSingleGate(id)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             let errorMessage = "Authentication failed !";
//             if (data && data.status && data.status.message) {
//               errorMessage = data.status.message;
//             }
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         resolve({
//           data: data,
//         });
//       })
//       .catch((error) => {
//         resolve({
//           data: [],
//           errorMsg: error,
//         });
//       });
//   });
// };
// DevicesController.updateGate = (id, queryData) => {
//   return new Promise(function (resolve) {
//     Devices.updateGate(id, queryData)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             let errorMessage = "Authentication failed !";
//             if (data && data.status && data.status.message) {
//               errorMessage = data.status.message;
//             }
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         resolve({
//           data: data,
//         });
//       })

//       .catch((error) => {
//         resolve({
//           data: [],
//           errorMsg: error,
//         });
//       });
//   });
// };

export default DevicesController;
