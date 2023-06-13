const mongoose = require("mongoose");

const devicesSchema = new mongoose.Schema({
  gateId: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ["online", "offline"] },
  uid: { type: Number, required: true },
  vendor: { type: String, required: true, unique: true },
  gateway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gateway",
    required: true,
  },
});
module.exports = mongoose.model("devices", devicesSchema);
