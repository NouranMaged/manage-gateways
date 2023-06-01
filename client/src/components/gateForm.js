import React, { useState } from "react";
import { Button, Card, Stack, TextField } from "@mui/material";
import GatesController from "../services/controller/gatesController";
import Alerts from "./alerts";
import { validateIpAddress, validateEmptyFields } from "../utils/utils";

const GateForm = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    ipAddress: "",
    serialNumber: "",
  });
  const [alertData, setAlertData] = useState({
    show: false,
    severity: "",
    msg: "",
  });
  const [error, setError] = useState({
    name: "",
    ipAddress: "",
    serialNumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    //to empty error field once user update the wrong data
    setError({ ...error, [name]: "" });

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateIpAddress(formDetails.ipAddress)) {
      setError({ ...error, ipAddress: true });
    }
    if (validateEmptyFields(formDetails).length !== 0) {
      validateEmptyFields(formDetails).map((field) => {
        setError({ ...error, [field]: true });
      });
    }
    if (
      validateIpAddress(formDetails.ipAddress) &&
      validateEmptyFields(formDetails).length == 0
    ) {
      GatesController.addGate(formDetails).then(
        (data) =>
          data &&
          setAlertData({
            show: true,
            severity: "success",
            msg: "Gate Adedd Succefully!",
          }),
        setFormDetails({
          name: "",
          ipAddress: "",
          serialNumber: "",
        }),
        setTimeout(() => {
          setAlertData({
            show: false,
            severity: "",
            msg: "",
          });
        }, 3000)
      );
    }
  };
  return (
    <Card sx={{ padding: "20px" }}>
      {alertData.show && <Alerts alertData={alertData} />}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Stack direction="row">
            <TextField
              id="standard-basic"
              variant="standard"
              label="Serial Number"
              placeholder="Insert Serial Number"
              name="serialNumber"
              value={formDetails.serialNumber}
              onChange={handleChange}
              helperText={
                error.serialNumber == true && "Field Cannot be empty!"
              }
              error={error.serialNumber == true && true}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              id="standard-basic"
              variant="standard"
              label="Gate Name"
              placeholder="Insert Gate Name"
              name="name"
              value={formDetails.name}
              onChange={handleChange}
              helperText={error.name == true && "Field Cannot be empty!"}
              error={error.name == true && true}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              id="standard-basic"
              variant="standard"
              label="IP Address"
              placeholder="Insert IP Address"
              name="ipAddress"
              value={formDetails.ipAddress}
              onChange={handleChange}
              helperText={error.ipAddress == true && "Incorrect IP Address."}
              error={error.ipAddress == true && true}
            />
          </Stack>
          <Button variant="contained" type={"submit"}>
            Save Gateway
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default GateForm;
