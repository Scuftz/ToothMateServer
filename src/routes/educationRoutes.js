const express = require("express");
const mongoose = require("mongoose");
const Education = mongoose.model("Education");

const router = express.Router();

router.get("/Education", (req, res) => {
    Education.find()
    .then(education => res.json(education))
    .catch(err => res.status(404).json({ error: 'No topics found' }));
});

router.get("/Education/:age", (req, res) => {
    const age = req.params.age;
    Education.find({ "age_range": age })
    .then(education => res.json(education))
    .catch(err => res.status(404).json({ error: "No topics found" }))
});

router.post("/addEducation", async (req, res) => {
    const { topic, content } = req.body; //req.body contains the user sign up details

    try {
        const education = new Education({ topic, content }); //creating instance of user
        await education.save(); //saves the user - async operation to save user to DB
        res.send("")
    } catch (err) {
       return res.status(422).send({ error: "Could not fetch education content" })
    }
})

module.exports = router;