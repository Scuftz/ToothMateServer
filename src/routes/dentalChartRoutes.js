//File to get dental chart
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/:id/teeth", async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.send(user.tooth);
    })
    .catch((err) => {
      res.status(404).send({ error: err.message });
    });
});

router.get("/getDentalChart/:id", async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      const toothArray = user.tooth;
      res.send(toothArray);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
