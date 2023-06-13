const mongoose = require("mongoose");

const gatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNumber: { type: String, required: true, unique: true },
  ipAddress: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the IPv4 address is valid
        return /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(v);
      },
      message: (props) => `${props.value} is not a valid IPv4 address`,
    },
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "devices",
    },
  ],
});
module.exports = mongoose.model("gates", gatesSchema);
