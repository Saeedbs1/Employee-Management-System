const express = require("express");
const multer = require("multer");
const path = require("path");
const os = require("os");
const Employee = require("../models/Employee.cjs");

const router = express.Router();
const uploadsDir = path.join(os.tmpdir(), "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to fetch employee with ID ${req.params.id}` });
  }
});

router.post(
  "/",
  upload.fields([{ name: "photo" }, { name: "documents" }]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        dateOfBirth,
        jobTitle,
        department,
        salary,
        startDate,
      } = req.body;
      const photo =
        req.files && req.files.photo ? req.files.photo[0].path : null;
      const documents =
        req.files && req.files.documents
          ? req.files.documents.map((file) => file.path)
          : [];

      const newEmployee = new Employee({
        name,
        email,
        phone,
        dateOfBirth,
        jobTitle,
        department,
        salary,
        startDate,
        photo,
        documents,
      });

      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  upload.fields([{ name: "photo" }, { name: "documents" }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        phone,
        dateOfBirth,
        jobTitle,
        department,
        salary,
        startDate,
      } = req.body;
      const photo =
        req.files && req.files.photo ? req.files.photo[0].path : null;
      const documents =
        req.files && req.files.documents
          ? req.files.documents.map((file) => file.path)
          : [];

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phone,
          dateOfBirth,
          jobTitle,
          department,
          salary,
          startDate,
          photo,
          documents,
        },
        { new: true }
      );

      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete employee with ID ${req.params.id}` });
  }
});

module.exports = router;
