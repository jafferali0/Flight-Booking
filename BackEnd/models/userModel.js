const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

// Ensure unique index is created in MongoDB
userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;