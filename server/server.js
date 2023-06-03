require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log("Mongodb connected....");
  })
  .catch((err) => console.log(err.message));
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//Accepting cors
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const gatesRouter = require("./routes/gates");
app.use("/gates", gatesRouter);

const devicesRouter = require("./routes/devices");
app.use("/devices", devicesRouter);

app.listen(3000, () => console.log("Server Started"));
