const express = require("express");
const mongoose = require("mongoose");
const Education = mongoose.model("Education");

const router = express.Router();

router.get("/Education", (req, res) => {
    try {
        content = Education.find()
        res.send(content)
    } catch (err) {
        return res.status(422).send({ error: "Could not fetch education content" })
    }
});

router.post("/addEducation", async (req, res) => {
    const { title, content } = req.body; //req.body contains the user sign up details

    try {
        const education = new Education({ topic: title, content: content }); //creating instance of user
require("./models/Education");
await education.save(); //saves the user - async operation to save user to DB
    } catch (err) {
       console.log("no")
    }
})

module.exports = router;