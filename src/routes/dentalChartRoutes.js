//File to handle authentication
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/:id/tooth/:toothId", async (req, res) => {
  const { id, toothId } = req.params;
  User.findById(id)
    .then((user) => {
      const tooth = user.tooth.id(toothId);
      res.send(tooth);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.get("/getDentalChart/:id", async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      const toothArray = user.tooth;
      res.send(toothArray);
    }) .catch((err) => {
      res.status(404).send(err);
    });
});