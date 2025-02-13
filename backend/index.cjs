require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const timesheetRoutes = require("./routes/timesheets.cjs");
const employeeRoutes = require("./routes/employees.cjs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/employees", employeeRoutes);
app.use("/api/timesheets", timesheetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
