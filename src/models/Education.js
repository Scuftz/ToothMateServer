const mongoose = require("mongoose")

const educationSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

mongoose.model('Education', educationSchema);