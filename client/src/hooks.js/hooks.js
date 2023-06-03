import { useCallback, useEffect, useState } from "react";
import GatesController from "../services/controller/gatesController";
import DevicesController from "../services/controller/devicesController";
import { Alert, Snackbar } from "@mui/material";

const useGatesHooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allGates, setAllgates] = useState([]);

  const getAllGates = useCallback(async () => {
    setIsLoading(true);
    GatesController.getAllGates().then((data) => {
      if (data) {
        setAllgates(data.data);
        setIsLoading(false);
      }
    });
  }, []);

  return {
    setAllgates,
    allGates,
    getAllGates,
    isLoading,
    setIsLoading,
  };
};

const useDevicesHooks = (id) => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllDevices = (id) => {
    setIsLoading(true);
    DevicesController.getAllDevices().then((data) => {
      if (data) {
        let associatedDevices = data.data?.filter((x) => x.gateId === id);
        setDevices(associatedDevices);
        setIsLoading(false);
      }
    });
  };
  return {
    getAllDevices,
    setDevices,
    devices,
    isLoading,
    setIsLoading,
  };
};

const useAlerts = () => {
  const [alertData, setAlertData] = useState({
    show: false,
    severity: "success",
    msg: "",
  });
  var vertical = "top";
  var horizontal = "right";
  let alert = (
    <Snackbar open={alertData.show} anchorOrigin={{ vertical, horizontal }}>
      <Alert severity={alertData.severity}>{alertData.msg}</Alert>
    </Snackbar>
  );
  useEffect(() => {
    setTimeout(() => {
      setAlertData({
        show: false,
        severity: "success",
        msg: "",
      });
    }, 2000);
  }, [alertData.show]);

  return {
    setAlertData,
    alertData,
    alert,
  };
};

export { useGatesHooks, useDevicesHooks, useAlerts };
