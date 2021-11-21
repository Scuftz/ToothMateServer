const express = require("express");

const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const Appointment = mongoose.model("Appointment");
const Img = mongoose.model("Img");
const Pdf = mongoose.model("Pdf");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
});

const upload = multer({ storage: storage });

router.get("/image/:id", (req, res) => {
  const id = req.params.id;
  const imgv = Img.findOne({ _id: id }).then((imgv) =>
    res.send(Buffer.from(imgv.img.data.buffer).toString("base64"))
  );
});

router.get("/Appointment", (req, res) => {
  Appointment.find()
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(404).json({ error: "No appointments found" }));
});

router.post("/addAppointment", upload.single("file"), async (req, res) => {
  console.log(req.body.images[0].path);
  const { email, date, dentalData, notes } = req.body;

  var pdfs = new Pdf();
  pdfs.pdf.data = fs.readFileSync(req.body.invoice.path);
  pdfs.pdf.contentType = "application/pdf";

  //var images = new Img();
  var images = [];

  let imageArray = req.body.images;
  imageArray.forEach((image) => {
    var img = new Img();
    img.img.data = fs.readFileSync(image.path);
    img.img.contentType = "image/png";
    images.push(img);
  });

  /*try {                        
    images.img.data = fs.readFileSync(req.body.images[0].path);
  } catch (err) {
    images.img.data = "";
  }*/

  try {
    const appointment = new Appointment({
      email,
      date,
      dentalData,
      pdfs,
      images,
      notes,
    });
    await appointment.save();
    res.send("Appointment Made");
  } catch (err) {
    return res.status(422).send({ error: "Could not save appointment" });
  }
});

router.get("/Appointment/:email", (req, res) => {
  const email = req.params.email;

  Appointment.find({ email: email })
    .then((appointment) => res.json(appointment))
    .catch((err) => res.status(404).json({ error: "No appointments found" }));
});

module.exports = router;
