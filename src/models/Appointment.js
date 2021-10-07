const mongoose = require("mongoose"),
  Pdf = require('./PdfModel.js'), PdfSchema = mongoose.model('Pdf').schema, 
  Img = require('./ImgModel.js'), ImgSchema = mongoose.model('Img').schema;


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
  pdfs: [PdfSchema],
  // pdf: {
  //   type: Buffer,
  //   contentType: String
  // },
  imgs: [ImgSchema],
  notes: {
    type: String
  }
});

mongoose.model("Appointment", appointmentSchema);
