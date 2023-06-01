import Services from "../services";

var Devices = {};

Devices.getAllDevices = () => {
  return Services.getData(`/devices`);
};
// Devices.getSingleGate = (id) => {
//   return Services.getData(`/devices/${id}`);
// };
Devices.addDevice = (queryData) => {
  return Services.postData(`/devices`, queryData);
};
// Devices.updateGate = (id, queryData) => {
//   console.log(queryData);
//   return Services.patchData(`/devices/${id}`, queryData);
// };
Devices.deleteDevice = (id, queryData) => {
  return Services.deleteData(`/devices/${id}`, queryData);
};
export default Devices;
