import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import timesheetRoutes from "./routes/timesheets.js";
import employeeRoutes from "./routes/employees.js";

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
