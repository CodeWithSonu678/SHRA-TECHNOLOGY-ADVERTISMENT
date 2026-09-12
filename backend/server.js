const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const registrationRoutes = require("./src/routes/registrationRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "SHRA Technology API is running 🚀",
  });
});

app.use("/api/registrations", registrationRoutes);

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed ❌");

    console.error(error);
  });
