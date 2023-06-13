import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackBar = forwardRef((props, ref) => {
  var vertical = "top";
  var horizontal = "right";
  const [alertData, setAlertData] = useState({
    show: false,
    severity: "success",
    msg: "",
  });

  useImperativeHandle(ref, () => ({
    alterToggle(data) {
      setAlertData({
        show: data.show,
        severity: data.severity,
        msg: data.msg,
      });
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setAlertData({
        show: false,
        severity: "success",
        msg: "",
      });
    }, 2000);
  }, [alertData.show]);

  return (
    <Snackbar open={alertData.show} anchorOrigin={{ vertical, horizontal }}>
      <Alert severity={alertData.severity}>{alertData.msg}</Alert>
    </Snackbar>
  );
});

export default SnackBar;
