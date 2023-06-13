const express = require("express");
const Devices = require("../models/devices");
const Gate = require("../models/gates");

const router = express.Router();

// getting all
router.get("/", async (req, res) => {
  try {
    const devices = await Devices.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getting One
// router.get("/:id", getDevices, (req, res) => {
//   res.send(res.gate);
// });

// creating one
router.post("/", async (req, res) => {
  try {
    const gateway = await Gate.findById(req.body.gateId);
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    if (gateway.devices.length >= 10) {
      return res
        .status(400)
        .json({ message: "Maximum number of devices reached" });
    }
    const device = new Devices({
      gateId: req.body.gateId,
      dateCreated: req.body.dateCreated,
      status: req.body.status,
      uid: req.body.uid,
      vendor: req.body.vendor,
      gateway: gateway._id,
    });
    const newDevice = await device.save();
    gateway.devices.push(newDevice);
    await gateway.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one
// router.patch("/:id", getDevices, async (req, res) => {
//   if (req.body.name != null) {
//     res.gate.name = req.body.name;
//   }
//   if (req.body.serialNumber != null) {
//     res.gate.serialNumber = req.body.serialNumber;
//   }
//   if (req.body.ipAddress != null) {
//     res.gate.ipAddress = req.body.ipAddress;
//   }
//   if (req.body.devices != null) {
//     res.gate.devices = req.body.devices;
//   }
//   try {
//     const updatedgate = await res.gate.save();
//     res.status(201).json(updatedgate);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Deleting One
router.delete("/:id", getDevices, async (req, res) => {
  try {
    await res.device.deleteOne();
    res.json({ message: "Deleted device" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getDevices(req, res, next) {
  let device;
  try {
    device = await Devices.findById(req.params.id);
    if (device == null) {
      return res.status(404).json({ message: "Cannot find device" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.device = device;
  next();
}
module.exports = router;
