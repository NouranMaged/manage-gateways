let Services = {};
// const url = process.env.SERVER_URI + process.env.SERVER_PORT;
const url = "http://localhost:3000";
Services.getData = async (queryUrl) => {
  return fetch(url + queryUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    })
    .catch(function (err) {
      var fireErr = { status: 401 };
      if (err.message == "NetworkError when attempting to fetch resource.") {
        throw fireErr;
      } else {
        throw err;
      }
    });
};
Services.postData = async (queryUrl, queryData) => {
  return fetch(url + queryUrl, {
    method: "POST",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: queryData ? JSON.stringify(queryData) : null,
  })
    .then(function (response) {
      return Promise.resolve(response);
    })
    .catch(function (err) {
      var fireErr = { status: 401 };
      if (err.message == "NetworkError when attempting to fetch resource.") {
        throw fireErr;
      } else {
        throw err;
      }
    });
};
Services.deleteData = async (queryUrl, queryData) => {
  return fetch(url + queryUrl, {
    method: "DELETE",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    })
    .catch(function (err) {
      var fireErr = { status: 401 };
      if (err.message == "NetworkError when attempting to fetch resource.") {
        throw fireErr;
      } else {
        throw err;
      }
    });
};
Services.patchData = async (queryUrl, queryData) => {
  return fetch(url + queryUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: queryData ? JSON.stringify(queryData) : null,
  })
    .then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    })
    .catch(function (err) {
      var fireErr = { status: 401 };
      if (err.message == "NetworkError when attempting to fetch resource.") {
        throw fireErr;
      } else {
        throw err;
      }
    });
};
export default Services;
