const express = require("express");
const mongoose = require("mongoose");

const { loadEnvFile } = require('node:process');
loadEnvFile('./.env');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({urlencoded: true}))

//controllers
const loginController = require("./controllers/loginController");
const flightController = require("./controllers/flightsController");
const menuController = require("./controllers/menuController");

// establishing a connection with mongodb
async function connectToDB() {
  try {
    const result = await mongoose.connect(process.env.connection_string);
    console.log("Mongodb Conncection is succesful");
  } catch (err) {
    console.log(err);
  } 
}
connectToDB();

// testing the server is live
app.get("/", (req, res) => {
  // absolute file path from root
  res.sendFile(__dirname + "/templates/serverhome.html", (err) =>
    console.log(err),
  );
});

//the routes for authenticating user
app.use("/api", loginController);

// the routes for dashboard page
app.use("/api/dashboard", menuController);
app.use("/api/dashboard", flightController);

app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server is live: http://localhost:${PORT}`);
});
