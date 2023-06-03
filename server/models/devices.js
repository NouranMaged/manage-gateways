const mongoose = require("mongoose");

const devicesSchema = new mongoose.Schema({
  gateId: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, required: true },
  uid: { type: Number, required: true },
  vendor: { type: String, required: true },
});
module.exports = mongoose.model("devices", devicesSchema);
