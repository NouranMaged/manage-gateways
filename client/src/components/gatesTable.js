import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GatesController from "../services/controller/gatesController";
import { useNavigate } from "react-router-dom";
import { useGatesHooks } from "../hooks/hooks";

const GatesTable = ({ getAllGates, allGates }) => {
  const navigate = useNavigate();
  const { isLoading } = useGatesHooks();

  const handleDeleteGate = (id) => {
    GatesController.deleteGate(id).then(async (data) => {
      getAllGates();
    });
  };
  return (
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
      {isLoading ? (
        <CircularProgress
          sx={{
            width: "100px",
            height: "100px",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
          }}
        />
      ) : (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Gate Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Serial Number</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>IP Address</strong>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allGates?.map((gate, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="gate">
                    {gate.name}
                  </TableCell>
                  <TableCell align="right">{gate.serialNumber}</TableCell>
                  <TableCell align="right">{gate.ipAddress}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => navigate(`/single-gate/${gate._id}`)}
                    >
                      Show Details
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleDeleteGate(gate._id)}
                    >
                      <DeleteForeverIcon fontSize={"large"} color="warning" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </TableContainer>
  );
};
export default GatesTable;
