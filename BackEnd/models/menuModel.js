const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    title: {
        type: "String",
        required: true,
    }
});

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;

