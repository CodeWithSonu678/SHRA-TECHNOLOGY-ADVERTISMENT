const express = require("express");

const Registration = require("../models/Registration");

const router = express.Router();


/*
    POST
    /api/registrations
*/

router.post("/", async (req, res) => {

    try {

        const {
            name,
            mobile,
            email,
            college,
            currentCourse,
            registrationDate
        } = req.body;


        // Basic validation

        if (
            !name ||
            !mobile ||
            !email ||
            !college ||
            !currentCourse
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }


        // Mobile validation

        if (!/^[0-9]{10}$/.test(mobile)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit mobile number."
            });

        }


        // Check duplicate mobile/email

        const existingStudent = await Registration.findOne({
            $or: [
                { mobile: mobile },
                { email: email.toLowerCase() }
            ]
        });


        if (existingStudent) {

            return res.status(409).json({
                success: false,
                message: "You are already registered."
            });

        }


        // Create registration

        const registration = await Registration.create({

            name,
            mobile,
            email,
            college,
            currentCourse,
            registrationDate

        });


        // Response

        return res.status(201).json({

            success: true,

            message: "Registration successful!",

            registrationId: registration._id,

            registrationDate : registration.registrationDate

        });

    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server error. Please try again."

        });

    }

});


module.exports = router;