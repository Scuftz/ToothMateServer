const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dentalData: {
    type: Array,
  },
});

mongoose.model("Appointment", appointmentSchema);
