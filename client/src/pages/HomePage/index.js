import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import GateForm from "../../components/gateForm";
import GatesTable from "../../components/gatesTable";
import { useGatesHooks } from "../../hooks.js/hooks";

const HomePage = () => {
  const { getAllGates, allGates } = useGatesHooks();
  useEffect(() => {
    getAllGates();
  }, []);
  return (
    <Container>
      <Typography variant="h4">Gateways</Typography>

      {/* Form to add new Gate */}
      <GateForm allGates={allGates} getAllGates={getAllGates} />

      {/* List of Subscribed Gates */}
      <GatesTable allGates={allGates} getAllGates={getAllGates} />
    </Container>
  );
};

export default HomePage;
