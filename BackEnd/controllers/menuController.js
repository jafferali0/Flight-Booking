const express = require("express");
const menuController = express();

//models
const menuModel = require("../models/menuModel.js");

menuController.get("/menu", async (req, res) => {
  const data = await menuModel.find();
  // console.log(data)
  if (data?.length > 0) {
    res.json(data);
  } else {
    res.json([]);
  }
});

module.exports = menuController;
