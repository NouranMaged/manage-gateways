import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Alerts from "./alerts";
import DevicesController from "../services/controller/devicesController";
import { validateEmptyFields } from "../utils/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeviceForm = ({
  gate,
  setOpenForm,
  openForm,
  getAllDevices,
  deviceId,
}) => {
  const handleClose = () => setOpenForm(false);

  const [formDetails, setFormDetails] = useState({
    gateId: gate._id,
    uid: "",
    vendor: "",
    dateCreated: "",
    status: "",
  });
  const [error, setError] = useState({
    uid: "",
    vendor: "",
    dateCreated: "",
    status: "",
  });
  const [alertData, setAlertData] = useState({
    show: false,
    severity: "",
    msg: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmptyFields(formDetails).length !== 0) {
      validateEmptyFields(formDetails).map((field) => {
        setError({ ...error, [field]: true });
      });
    }
    if (validateEmptyFields(formDetails).length == 0) {
      DevicesController.addDevice(formDetails).then((data) => {
        getAllDevices(deviceId);
        if (data.errorMsg) {
          setAlertData({
            show: true,
            severity: "warning",
            msg: "Error! Invalid Data!",
          });
        } else {
          setAlertData({
            show: true,
            severity: "success",
            msg: "Device Adedd Succefully!",
          });
          setTimeout(() => {
            setAlertData({
              show: false,
              severity: "",
              msg: "",
            });
            handleClose();
          }, 2000);
        }
      });
    }
  };

  return (
    <Modal
      open={openForm}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {alertData.show && <Alerts alertData={alertData} />}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={400}>
            <Typography variant="h6">Add New Device: </Typography>
            <TextField
              id="outlined-basic"
              label="UID"
              placeholder="Insert UID"
              variant="outlined"
              name="uid"
              value={formDetails.serialNumber}
              onChange={handleChange}
              helperText={error.uid == true && "Field Cannot be empty!"}
              error={error.uid == true && true}
            />

            <TextField
              id="outlined-basic"
              label="Vendor"
              placeholder="Insert vendor"
              variant="outlined"
              name="vendor"
              value={formDetails.name}
              onChange={handleChange}
              helperText={error.vendor == true && "Field Cannot be empty!"}
              error={error.vendor == true && true}
            />
            <TextField
              id="outlined-basic"
              label="Date Created At"
              placeholder="Insert Date Created At"
              variant="outlined"
              name="dateCreated"
              value={formDetails.ipAddress}
              onChange={handleChange}
              // helperText={error.dateCreated == true && "Field Cannot be empty!"}
              // error={error.dateCreated == true && true}
            />

            <Typography variant="h6">Status: </Typography>
            {error.status == true && (
              <Typography color={"red"}>{error.status}</Typography>
            )}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="status"
              value={formDetails.status}
              onChange={handleChange}
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online"
              />
              <FormControlLabel
                value="offline"
                control={<Radio />}
                label="Offline"
              />
            </RadioGroup>

            <Button variant="contained" type={"submit"}>
              Save Device
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default DeviceForm;
