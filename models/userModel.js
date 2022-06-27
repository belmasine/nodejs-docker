const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: ["true", "must have username"],
        unique: true
    },
    password: {
        type: String,
        require: ["true", "must have pwd"],
        unique: true
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;