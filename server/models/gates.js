const mongoose = require("mongoose");

const gatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNumber: { type: String, required: true },
  ipAddress: { type: String, required: true },
});
module.exports = mongoose.model("gates", gatesSchema);
