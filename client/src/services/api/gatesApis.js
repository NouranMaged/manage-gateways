import Services from "../services";

var Gates = {};

Gates.getAllGates = () => {
  return Services.getData(`/gates`);
};
Gates.getSingleGate = (id) => {
  return Services.getData(`/gates/${id}`);
};
Gates.addGate = (queryData) => {
  return Services.postData(`/gates`, queryData);
};
// Gates.updateGate = (id, queryData) => {
//   return Services.patchData(`/gates/${id}`, queryData);
// };
Gates.deleteGate = (id, queryData) => {
  return Services.deleteData(`gates/${id}`, queryData);
};
export default Gates;
