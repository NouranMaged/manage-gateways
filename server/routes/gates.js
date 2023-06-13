const express = require("express");
const router = express.Router();
const Gate = require("../models/gates");
const Devices = require("../models/devices");

// getting all
router.get("/", async (req, res) => {
  try {
    const gates = await Gate.find().populate("devices");
    res.json(gates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getting One
router.get("/:id", getGates, async (req, res) => {
  try {
    const gateway = await Gate.findById(req.params.id).populate("devices");
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    res.json(gateway);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// creating one
router.post("/", async (req, res) => {
  try {
    // Validate the input fields
    if (!req.body.serialNumber || !req.body.name || !req.body.ipAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const gate = new Gate({
      name: req.body.name,
      serialNumber: req.body.serialNumber,
      ipAddress: req.body.ipAddress,
    });

    const newGate = await gate.save();
    res.status(201).json(newGate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one
router.patch("/:id", getGates, async (req, res) => {
  if (req.body.name != null) {
    res.gate.name = req.body.name;
  }
  if (req.body.serialNumber != null) {
    res.gate.serialNumber = req.body.serialNumber;
  }
  if (req.body.ipAddress != null) {
    res.gate.ipAddress = req.body.ipAddress;
  }
  if (req.body.devices != null) {
    res.gate.devices = req.body.devices;
  }
  try {
    const updatedgate = await res.gate.save();
    res.status(201).json(updatedgate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting One
router.delete("/:id", getGates, async (req, res) => {
  try {
    await res.gate.deleteOne();
    res.json({ message: "Deleted gate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting All
// router.delete("/", getGates, async (req, res) => {
//   try {
//     await res.deleteMany();
//     res.json({ message: "Deleted All" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

async function getGates(req, res, next) {
  let gate;
  try {
    gate = await Gate.findById(req.params.id);
    if (gate == null) {
      return res.status(404).json({ message: "Cannot find gate" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.gate = gate;
  next();
}
module.exports = router;
