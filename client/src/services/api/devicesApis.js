import Services from "../services";

var Devices = {};

Devices.getAllDevices = () => {
  return Services.getData(`/devices`);
};

Devices.addDevice = (queryData) => {
  return Services.postData(`/devices`, queryData);
};

Devices.deleteDevice = (id, queryData) => {
  return Services.deleteData(`/devices/${id}`, queryData);
};
export default Devices;
