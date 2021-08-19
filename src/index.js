require("./models/User");
require("./models/Education");
require("./models/Clinic");
require("./models/Appointment");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const educationRoutes = require("./routes/educationRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(educationRoutes);
app.use(clinicRoutes);
app.use(appointmentRoutes);


//MongoDB connection
const mongoUri =
  "mongodb+srv://tmAdmin:tmAdminR&D@toothmatecluster.82nq5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//When the mongoose connection is successful, the following callback function is called
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

//When the mongoose connection fails, the following callback function is called with an error object given
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

//Root route of application
//requireAuth is ran first, verifying the JWT, before running the user's request
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

//Make app listen on local port
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
