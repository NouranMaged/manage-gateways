// import Requests from "../api/requestsApi";

// var RequestsController = {};

// RequestsController.getRequests = (filterPerPage, status) => {
//   var queryData = {
//     page: filterPerPage,
//     status: status,
//   };
//   return new Promise(function (resolve) {
//     Requests.getRequests(queryData)
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
// RequestsController.acceptRequest = (id, status) => {
//   var queryData = {
//     status: status,
//   };
//   return new Promise(function (resolve) {
//     Requests.acceptRequest(id, queryData)
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

//       .catch((error) => {
//         resolve({
//           data: [],
//           errorMsg: error,
//         });
//       });
//   });
// };
// export default RequestsController;
