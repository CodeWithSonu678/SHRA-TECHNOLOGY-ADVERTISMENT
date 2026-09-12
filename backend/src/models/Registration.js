const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        college: {
            type: String,
            required: true,
            trim: true
        },

        currentCourse: {
            type: String,
            required: true,
            trim: true
        },

        registrationDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "RegistrationForOneWeek",
    registrationSchema
);