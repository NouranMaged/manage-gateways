import React, { useEffect, useState } from "react";
import GatesController from "../../services/controller/gatesController";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import DeviceForm from "../../components/deviceForm";
import DeviceCard from "../../components/deviceCard";

const SingleGate = () => {
  const [data, setData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getSingleGate();
  }, []);

  const getSingleGate = () => {
    GatesController.getSingleGate(id).then((data) => {
      data && setData(data.data);
    });
  };
  return (
    <Container>
      <Typography variant="h4">Gateway Details</Typography>
      <Paper sx={{ padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <Typography>
          <strong>Gate Name: </strong>
          {data.name}
        </Typography>
        <Typography>
          <strong>Serial Number: </strong> {data.serialNumber}
        </Typography>
        <Typography>
          <strong>IP Address: </strong>
          {data.ipAddress}
        </Typography>
      </Paper>
      {openForm && (
        <DeviceForm gate={data} setOpenForm={setOpenForm} openForm={openForm} />
      )}

      <DeviceCard devices={data.devices} setOpenForm={setOpenForm} />
    </Container>
  );
};

export default SingleGate;
