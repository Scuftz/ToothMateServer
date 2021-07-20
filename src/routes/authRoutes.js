//File to handle authentication
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

//Whenever someone makes a POST request to /signup, the following callback function will be called
router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, mobile, password } = req.body; //req.body contains the user sign up details

    try {
        const user = new User({ firstname, lastname, email, mobile, password}); //creating instance of user
        await user.save(); //saves the user - async operation to save user to DB

        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY"); //creating JWT, assigning it its id from the DB to the token
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message); //422 indicates user sent us invalid data
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(422).send({ error: "Must provide email and password" });
    }

    const user = await User.findOne({ email });
    if(!user) {
        return res.status(422).send({ error: "Invalid password or email" });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: "Invalid password or email" });
    }
});

module.exports = router;