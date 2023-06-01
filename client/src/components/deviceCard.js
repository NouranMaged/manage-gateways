import React from "react";
import {
  CardContent,
  Typography,
  CardHeader,
  Card,
  IconButton,
  Box,
  Grid,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DevicesController from "../services/controller/devicesController";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { formatDate } from "../utils/utils";

const DeviceCard = ({ setOpenForm, devices, getAllDevices, deviceId }) => {
  const handleDeleteDevice = (id) => {
    DevicesController.deleteDevice(id).then((data) => {
      getAllDevices(deviceId);
    });
  };
  return (
    <Box>
      <Stack direction={"row"} spacing={20}>
        <Typography variant="h4">Associated Peripheral Devices</Typography>
        <Button
          onClick={() => setOpenForm(true)}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          disabled={devices?.length >= 10 ? true : false}
        >
          Add Peripheral Devices
        </Button>
      </Stack>
      {devices?.length != 0 ? (
        <Grid container spacing={6}>
          {devices?.map((element, index) => {
            return (
              <Grid item md={3} xs={12} sm={6} key={index} mt={5}>
                <Card
                  sx={{
                    minWidth: 275,
                  }}
                  key={index}
                >
                  <CardHeader
                    title={"UID: " + element.uid}
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleDeleteDevice(element._id)}
                      >
                        <DeleteForeverIcon fontSize={"large"} color="warning" />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography>
                      <strong>Date Created: </strong>{" "}
                      {formatDate(element.dateCreated)}
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                      <Typography>
                        <strong>Status: </strong>
                      </Typography>
                      <Typography component={"span"}>
                        {element.status == "online" ? (
                          <Chip label={element.status} color={"success"} />
                        ) : (
                          <Chip label={element.status} />
                        )}
                      </Typography>
                    </Stack>
                    <Typography>
                      <strong>Vendor: </strong> {element.vendor}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>No Devices Found for this Gate!</Typography>
      )}
    </Box>
  );
};

export default DeviceCard;
