const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  summary: { type: String, required: true },
});

module.exports = mongoose.model("Timesheet", TimesheetSchema);
