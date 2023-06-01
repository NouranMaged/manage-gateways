import React, { useEffect, useState } from "react";
import GatesController from "../../services/controller/gatesController";
import { Container, Typography } from "@mui/material";
import GateForm from "../../components/gateForm";
import GatesTable from "../../components/gatesTable";

const HomePage = () => {
  const [allGates, setAllgates] = useState([]);

  useEffect(() => {
    GatesController.getAllGates().then((data) => setAllgates(data.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Gateways</Typography>

      <Typography variant="h6">Add a new Gateways:</Typography>

      {/* Form to add new Gate */}
      <GateForm />

      {/* List of Subscribed Gates */}
      <GatesTable allGates={allGates} />
    </Container>
  );
};

export default HomePage;
