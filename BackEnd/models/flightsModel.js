const mongoose = require("mongoose");

const flightsSchema = mongoose.Schema({
        "serviceNumber": String,
        "company": String,
        "numberOfSeats": Object,
        "source": Object,
        "destination": String,
        "duration": String,
        "intermediateStops": Array,
        "runningDays": Array
    });

const flightsModel = mongoose.model("flights_data", flightsSchema);

module.exports = flightsModel;