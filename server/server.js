require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const gatesRouter = require("./routes/gates");
app.use("/gates", gatesRouter);

const devicesRouter = require("./routes/devices");
app.use("/devices", devicesRouter);

app.listen(5000, () => console.log("Server Started"));
