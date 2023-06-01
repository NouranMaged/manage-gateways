import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const DeviceCard = (props) => {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getAllDevices();
  }, []);
  const getAllDevices = () => {
    DevicesController.getAllDevices().then((data) => {
      let associatedDevices = data.data.filter((x) => x.gateId === id);
      setData(associatedDevices);
    });
  };
  const handleDeleteDevice = (id) => {
    DevicesController.deleteDevice(id).then((data) => {
      console.log(data);
    });
  };
  return (
    <Box>
      <Stack direction={"row"} spacing={20}>
        <Typography variant="h4">Associated Peripheral Devices</Typography>
        <Button
          onClick={() => props.setOpenForm(true)}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          disabled={data?.length >= 10 ? true : false}
        >
          Add Peripheral Devices
        </Button>
      </Stack>
      {data?.length != 0 ? (
        <Grid container spacing={6}>
          {data?.map((element, index) => {
            return (
              <Grid item md={3} xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    minWidth: 275,
                    border: "solid",
                    borderWidth: "1px",
                    borderColor: "grey",
                    marginTop: "5px",
                  }}
                  key={index}
                >
                  <CardHeader
                    title={"uid: " + element.uid}
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
                      <strong>Date Created At: </strong> {element.dateCreated}
                    </Typography>
                    <Typography>
                      <strong>Status: </strong>
                      {element.status == "online" ? (
                        <Chip label={element.status} color={"success"} />
                      ) : (
                        <Chip label={element.status} />
                      )}
                    </Typography>
                    <Typography>
                      {" "}
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
