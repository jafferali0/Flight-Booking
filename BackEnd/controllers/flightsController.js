const express = require("express");
const flightController = express();

//models
const flightsModel = require("../models/flightsModel.js");

const cityCodes = [
  {
    city: "Kolkata",
    code: "KOL",
  },
  {
    city: "Delhi",
    code: "DHL",
  },
  {
    city: "Mumbai",
    code: "MUI",
  },
  {
    city: "Chennai",
    code: "CH",
  },
  {
    city: "Bengaluru",
    code: "BLR",
  },
  {
    city: "Hyderabad",
    code: "HYD",
  },
  {
    city: "Pune",
    code: "PU",
  },
  {
    city: "Ahmedabad",
    code: "AHD",
  },
  {
    city: "Kochi",
    code: "KH",
  },
];

flightController.post("/get-flights", async (req, res) => {
  console.log(req.body);
  const query = req.body;
  const source = query.source.split("-");
  const destination = query.destination;

  // we need to filter the flights for source
  const sourceFlights = await flightsModel.find({
    "source.airport": `${(cityCodes.find((value) => value.code == source[0]))?.city}-${source[1]}`,
  });
  if(sourceFlights?.length > 0) {
    res.json(sourceFlights)
  } else {
    res.json([])
  }
});

flightController.get("/get-companies",(async (req, res)=> {
    const flightsData = await flightsModel.find();
    const result = flightsData.map((obj) => obj.company);
    res.json(result);
}))

module.exports = flightController
