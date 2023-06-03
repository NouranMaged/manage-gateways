import React, { useState } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import GatesController from "../services/controller/gatesController";
import { validateIpAddress, validateEmptyFields } from "../utils/utils";
import { useAlerts } from "../hooks/hooks";

const GateForm = ({ getAllGates }) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    ipAddress: "",
    serialNumber: "",
  });
  const { setAlertData, alert } = useAlerts();
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
    //validate IP Address
    if (!validateIpAddress(formDetails.ipAddress)) {
      setError({ ...error, ipAddress: true });
    }

    //validate All fields are filled
    if (validateEmptyFields(formDetails).length !== 0) {
      validateEmptyFields(formDetails).map((field) => {
        setError({ ...error, [field]: true });
      });
    }

    //handle Add gate request
    if (
      validateIpAddress(formDetails.ipAddress) &&
      validateEmptyFields(formDetails).length == 0
    ) {
      GatesController.addGate(formDetails).then((data) => {
        if (data.errorMsg) {
          setAlertData({
            show: true,
            severity: "warning",
            msg: "Error! Invalid Data!",
          });
        } else {
          if (data) {
            setAlertData({
              show: true,
              severity: "success",
              msg: "Gate Adedd Succefully!",
            });
            getAllGates();
          }

          setFormDetails({
            name: "",
            ipAddress: "",
            serialNumber: "",
          });
        }
      });
    }
  };
  return (
    <Card sx={{ padding: "20px" }}>
      <Typography variant="h6">Add a new Gateway:</Typography>
      <form onSubmit={handleSubmit}>
        {alert}
        <Stack spacing={4}>
          <Stack direction="row">
            <TextField
              id="standard-basic"
              data-testid="input-field"
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
              data-testid="input-field"
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
              data-testid="input-field"
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
          <Button variant="contained" type={"submit"} data-testid="submit-btn">
            Save Gateway
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default GateForm;
