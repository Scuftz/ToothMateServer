const express = require("express");
const mongoose = require("mongoose");
const Appointment = mongoose.model("Appointment");

const router = express.Router();

router.get("/Appointment", (req, res) => {
  Appointment.find()
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(404).json({ error: "No appointments found" }));
});

router.post("/addAppointment", async (req, res) => {
  console.log("Hello!");
  const { email, date, dentalData } = req.body;
  console.log("Req: " + req.body);
  console.log("E: " + email);
  console.log("D: " + date);
  console.log("DD: " + dentalData);

  try {
    const appointment = new Appointment({ email, date, dentalData });
    await appointment.save();
    res.send("Appointment Made");
  } catch (err) {
    return res.status(422).send({ error: "Could not save appointment" });
  }
});

router.get("/Appointment/:email", (req, res) => {
  const email = req.params.email;

  Appointment.find({ email: email })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(404).json({ error: "No appointments found" }));
});
module.exports = router;
