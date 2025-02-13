const express = require("express");
const Timesheet = require("../models/Timesheets.cjs");

const router = express.Router();

router.get("/", async (req, res) => {
  const timesheets = await Timesheet.find().populate("employee");
  res.json(timesheets);
});

router.get("/:id", async (req, res) => {
  const timesheet = await Timesheet.findById(req.params.id).populate(
    "employee"
  );
  res.json(timesheet);
});

router.post("/", async (req, res) => {
  const newTimesheet = new Timesheet(req.body);
  await newTimesheet.save();
  res.json(newTimesheet);
});

router.put("/:id", async (req, res) => {
  const updatedTimesheet = await Timesheet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTimesheet);
});

router.delete("/:id", async (req, res) => {
  await Timesheet.findByIdAndDelete(req.params.id);
  res.json({ message: "Timesheet deleted" });
});

module.exports = router;
