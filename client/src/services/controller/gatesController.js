import Gates from "../api/gatesApis";

var GatesController = {};

GatesController.getAllGates = () => {
  return new Promise(function (resolve) {
    Gates.getAllGates()
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
GatesController.addGate = (queryData) => {
  return new Promise(function (resolve) {
    Gates.addGate(queryData)
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
GatesController.getSingleGate = (id) => {
  return new Promise(function (resolve) {
    Gates.getSingleGate(id)
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
GatesController.deleteGate = (id, queryData) => {
  return new Promise(function (resolve) {
    Gates.deleteGate(id, queryData)
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
export default GatesController;
