import React, { useRef, useState } from "react";
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

import DevicesController from "../services/controller/devicesController";
import { validateEmptyFields } from "../utils/utils";
import moment from "moment";
import SnackBar from "./snackBar";
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

const DeviceForm = ({ gate, setOpenForm, openForm, getSingleGate }) => {
  const handleClose = () => setOpenForm(false);
  const snackBarRef = useRef(null);
  const [formDetails, setFormDetails] = useState({
    gateId: "",
    uid: "",
    vendor: "",
    dateCreated: moment().format("YYYY-MM-DD"),
    status: "",
    gateway: {},
  });
  const [error, setError] = useState({
    uid: "",
    vendor: "",
    dateCreated: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //empty error msgs when user type
    setError({
      ...setError,
      [name]: "",
    });

    setFormDetails({
      ...formDetails,
      gateId: gate._id,
      gateway: gate._id,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check that UID is a number
    if (isNaN(formDetails.uid)) {
      setError({ uid: "UID should be a number!" });
    }

    //check that all fields are not empty
    if (validateEmptyFields(formDetails).length !== 0) {
      validateEmptyFields(formDetails).map((field) => {
        setError({ ...error, [field]: true });
      });
    }

    //Add device call
    if (validateEmptyFields(formDetails).length == 0) {
      DevicesController.addDevice(formDetails).then((data) => {
        getSingleGate();
        if (data.errorMsg) {
          snackBarRef.current.alterToggle({
            show: true,
            severity: "warning",
            msg: "Error! Invalid Data!",
          });
        } else {
          snackBarRef.current.alterToggle({
            show: true,
            severity: "success",
            msg: "Device Adedd Succefully!",
          });
          setTimeout(() => {
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
        <SnackBar ref={snackBarRef} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={400}>
            <Typography variant="h6">Add New Device: </Typography>

            {/* UID FIELD */}
            <TextField
              id="outlined-basic"
              label="UID"
              placeholder="Insert UID"
              variant="outlined"
              name="uid"
              value={formDetails.uid}
              onChange={handleChange}
              helperText={error.uid == true && "Field Cannot be empty!"}
              error={error.uid == true && true}
            />

            {/* VENDOR FIELD */}
            <TextField
              id="outlined-basic"
              label="Vendor"
              placeholder="Insert vendor"
              variant="outlined"
              name="vendor"
              value={formDetails.vendor}
              onChange={handleChange}
              helperText={error.vendor == true && "Field Cannot be empty!"}
              error={error.vendor == true && true}
            />

            {/* CREATED AT FIELD  */}
            <TextField
              id="date"
              name="dateCreated"
              label="Date Created At"
              type="date"
              data-testid="input-date"
              placeholder="hello"
              defaultValue={formDetails.dateCreated}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* STATUS FIELD */}
            <Typography variant="h6">Status: </Typography>
            {error.status == true && (
              <Typography color={"red"} sx={{ fontSize: "12px" }}>
                Field Cannot be empty!
              </Typography>
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
