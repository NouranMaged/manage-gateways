import React, { useEffect, useState } from "react";
import GatesController from "../../services/controller/gatesController";
import { useParams, useNavigate } from "react-router-dom";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeviceForm from "../../components/deviceForm";
import DeviceCard from "../../components/deviceCard";

const SingleGate = () => {
  const [data, setData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const deviceId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getSingleGate();
  }, []);

  const getSingleGate = () => {
    setIsLoading(true);
    GatesController.getSingleGate(deviceId).then((data) => {
      setData(data?.data);
      setIsLoading(false);
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
          deviceId={deviceId}
          getSingleGate={getSingleGate}
        />
      )}
      <DeviceCard
        devices={data.devices}
        setOpenForm={setOpenForm}
        deviceId={deviceId}
        getSingleGate={getSingleGate}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default SingleGate;
