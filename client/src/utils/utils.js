import Moment from "moment";

const validateIpAddress = (ip) => {
  // Regular expression to check if string is a IP address
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  // String with IP address
  // const str = "192.168.5.68";
  return regexExp.test(ip);
};
const validateEmptyFields = (formDetails) => {
  let emptyFields = Object.keys(formDetails).filter((element) => {
    if (formDetails[element] === "") {
      return element;
    }
  });

  return emptyFields;
};
const formatDate = (date) => {
  return Moment(date).format("DD-MM-YYYY hh:mm");
};

export { validateIpAddress, validateEmptyFields, formatDate };
