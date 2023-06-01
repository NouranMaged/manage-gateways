import { useCallback, useEffect, useState } from "react";
import GatesController from "../services/controller/gatesController";
import DevicesController from "../services/controller/devicesController";

const useGatesHooks = () => {
  const [allGates, setAllgates] = useState([]);
  const getAllGates = useCallback(async () => {
    GatesController.getAllGates().then((data) => setAllgates(data.data));
  }, []);

  return {
    setAllgates,
    allGates,
    getAllGates,
  };
};

const useDevicesHooks = (id) => {
  const [devices, setDevices] = useState([]);
  const getAllDevices = (id) => {
    DevicesController.getAllDevices().then((data) => {
      let associatedDevices = data.data.filter((x) => x.gateId === id);
      setDevices(associatedDevices);
    });
  };
  return {
    getAllDevices,
    setDevices,
    devices,
  };
};
export { useGatesHooks, useDevicesHooks };
