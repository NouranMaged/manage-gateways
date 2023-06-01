const mongoose = require("mongoose");

const devicesSchema = new mongoose.Schema({
  //gateId: { type: String, ref: gatesSchema._id },
  gateId: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, required: true },
  uid: { type: String, required: true },
  vendor: { type: String, required: true },
});
module.exports = mongoose.model("devices", devicesSchema);
