const express = require("express");
const mongoose = require("mongoose");
const Clinic = mongoose.model("Clinic");

const router = express.Router();

router.get("/Clinics", (req, res) => {
    Clinic.find()
    .then(Clinic => res.json(Clinic))
    .catch(err => res.status(404).json({ error: 'No clinics found' }));
});

module.exports = router;