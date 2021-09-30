//File to handle authentication
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const router = express.Router();

//Whenever someone makes a POST request to /signup, the following callback function will be called
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, dob, clinic } =
    req.body; //req.body contains the user sign up details

  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      dob,
      clinic,
    }); //creating instance of user
    await user.save(); //saves the user - async operation to save user to DB

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY"); //creating JWT, assigning it its id from the DB to the token
    res.send({ token, id: user._id });
  } catch (err) {
    return res.status(422).send(err.message); //422 indicates user sent us invalid data
  }
});

router.post("/signupchild", async (req, res) => {
  const { firstname, lastname, email, password, dob, clinic, parent } =
    req.body;

  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      parent,
      dob,
      clinic,
    });
    console.log(user);
    parentInfo = await User.findByIdAndUpdate(parent, {
      $push: { children: user._id },
    });
    await user.save();
    res.send();
  } catch (err) {
    console.log(err.message);
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token, id: user._id, user });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

router.post("/user", async (req, res) => {
  console.log(req.body.token);
  const token = req.body.token;
  const userId = jwt.decode(token);

  console.log(userId);

  const user = await User.findOne({ _id: userId.userId });
  console.log(user);

  res.send({ token, user });
});

//Whenever someone opens education screen, give the date of birth to the code to find out their age range
router.get("/getDOB/:id", (req, res) => {
  const id = req.params.id;

  const user = User.findOne({ _id: id })
    .then((user) => res.json({ dob: user.dob }))
    .catch((err) => res.status(404).json({ error: "No topics found" }));
});

router.get("/getEmail/:id", (req, res) => {
  const id = req.params.id;

  const user = User.findOne({ _id: id })
    .then((user) => res.json({ email: user.email }))
    .catch((err) => res.status(404).json({ error: "No email found" }));
});

router.get("/getUserClinic/:id", (req, res) => {
  const id = req.params.id;

  console.log("User Clinic id: " + id);

  const user = User.findOne({ _id: id })
    .then((user) => res.json({ clinic: user.clinic }))
    .catch((err) => res.status(404).json({ error: "No email found" }));
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;

  const user = User.findOne({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ error: "No email found" }));
});

router.put('/updateUser/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ error: "" }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

router.put('/updateUserClinic/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ error: "" }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

router.put("/changePassword/:id", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.params.id;

  if (!oldPassword) {
    return res.status(422).send({ error: "Must provide current password" });
  }

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    const match = await user.comparePassword(oldPassword);
    console.log(match)

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return err;
      }
  
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) {
          return err;
        }
        User.updateOne({"_id": id}, {"password": hash})
        .then(() => res.json({}))
      });
    });
    
  } catch (err) {
    return res.status(422).send({ error: "Invalid password" });
  }
});

module.exports = router;
