const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User",userSchema)