import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dateOfBirth: String,
  jobTitle: String,
  department: String,
  salary: Number,
  startDate: String,
  photo: String, 
  documents: [String],
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
