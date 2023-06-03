import React, { useEffect, useState } from "react";
import GatesController from "../../services/controller/gatesController";
import { useParams, useNavigate } from "react-router-dom";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeviceForm from "../../components/deviceForm";
import DeviceCard from "../../components/deviceCard";
import { useDevicesHooks } from "../../hooks.js/hooks";

const SingleGate = () => {
  const { getAllDevices, devices } = useDevicesHooks();
  const [data, setData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const params = useParams();
  const deviceId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getSingleGate();
    getAllDevices(deviceId);
  }, []);

  const getSingleGate = () => {
    GatesController.getSingleGate(deviceId).then((data) => {
      data && setData(data?.data);
    });
  };

  return (
    <Container>
      <Stack direction={"row"}>
        <IconButton aria-label="settings" onClick={() => navigate("/")}>
          <ArrowBackIcon fontSize={"large"} />
        </IconButton>
        <Typography variant="h4">Gateway Details</Typography>
      </Stack>
      <Paper sx={{ padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <Typography>
          <strong>Gate Name: </strong>
          {data?.name}
        </Typography>
        <Typography>
          <strong>Serial Number: </strong> {data?.serialNumber}
        </Typography>
        <Typography>
          <strong>IP Address: </strong>
          {data?.ipAddress}
        </Typography>
      </Paper>
      {openForm && (
        <DeviceForm
          gate={data}
          setOpenForm={setOpenForm}
          openForm={openForm}
          getAllDevices={getAllDevices}
          deviceId={deviceId}
        />
      )}
      <DeviceCard
        devices={devices}
        setOpenForm={setOpenForm}
        getAllDevices={getAllDevices}
        deviceId={deviceId}
      />
    </Container>
  );
};

export default SingleGate;
