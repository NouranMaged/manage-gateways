import * as React from "react";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  Link,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GatesController from "../services/controller/gatesController";

const GatesTable = ({ allGates }) => {
  const handleDeleteGate = (id) => {
    GatesController.deleteGate(id).then((data) => {
      console.log(data);
    });
  };
  return (
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
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
          {allGates.map((gate, index) => (
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
                <Link size="small" href={`/single-gate/${gate._id}`}>
                  Show Details
                </Link>
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
    </TableContainer>
  );
};
export default GatesTable;
