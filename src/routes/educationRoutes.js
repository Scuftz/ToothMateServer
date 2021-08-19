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
    const { topic, content } = req.body; 

    try {
        const education = new Education({ topic, content }); 
        await education.save(); 
        res.send("")
    } catch (err) {
       return res.status(422).send({ error: "Could not fetch education content" })
    }
})

router.get("/Education/:range", (req, res) => {
    const range = req.params.range;
    Education.find({ age_range: { $lte: range } })
    .then(education => res.json(education))
    .catch(err => res.status(404).json({ error: 'No topics found' }));
})

module.exports = router;