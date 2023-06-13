import { useState } from "react";
import GatesController from "../services/controller/gatesController";
import DevicesController from "../services/controller/devicesController";

const useGatesHooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allGates, setAllgates] = useState([]);

  const getAllGates = () => {
    setIsLoading(true);
    GatesController.getAllGates().then((data) => {
      if (data) {
        setAllgates(data.data);
        setIsLoading(false);
      }
    });
  };

  return {
    setAllgates,
    allGates,
    getAllGates,
    isLoading,
    setIsLoading,
  };
};

export { useGatesHooks };
