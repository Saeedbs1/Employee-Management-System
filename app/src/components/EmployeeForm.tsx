import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Input,
  FormControl,
  FormLabel,
} from "@mui/material";
import type { Employee } from "../types";
import {
  validateEmail,
  validatePhone,
  validateSalary,
  validateDate,
  validateAge,
} from "../validation";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: FormData) => void;
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>(
    employee || {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      jobTitle: "",
      department: "",
      salary: 0,
      startDate: "",
      photo: null,
      documents: [],
    }
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    dateOfBirth: "",
    startDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFormData({ ...formData, documents: Array.from(files) });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email.";
    if (!validatePhone(formData.phone))
      newErrors.phone = "Invalid phone number (8).";
    if (!validateSalary(formData.salary))
      newErrors.salary = "Invalid salary (Less Than 500 Min).";
    if (!validateDate(formData.dateOfBirth))
      newErrors.dateOfBirth = "Invalid date of birth.";
    else if (
      !validateAge(
        new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
      )
    )
      newErrors.dateOfBirth = "Employee must be over 18 years old.";
    if (!validateDate(formData.startDate))
      newErrors.startDate = "Invalid start date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      formDataToSend.append("jobTitle", formData.jobTitle);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("salary", formData.salary.toString());
      formDataToSend.append("startDate", formData.startDate);
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }
      if (formData.documents) {
        formData.documents.forEach((document, index) => {
          formDataToSend.append(`documents`, document);
        });
      }
      onSubmit(formDataToSend);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Employee Details</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          fullWidth
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          required
          error={!!errors.salary}
          helperText={errors.salary}
        />
        <TextField
          fullWidth
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          error={!!errors.startDate}
          helperText={errors.startDate}
        />
      </Box>
      {  /*Since deployed on free server we cant store documents and  photos 
      <FormControl>     
        <FormLabel>Employee Photo</FormLabel>
        <Input
          type="file"
          name="photo"
          onChange={handleFileChange}
          inputProps={{ accept: "image/*" }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Documents</FormLabel>
        <Input
          type="file"
          name="documents"
          onChange={handleDocumentsChange}
          inputProps={{ multiple: true }}
        />
      </FormControl> */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ alignSelf: "flex-start" }}
      >
        Save
      </Button>
    </Box>
  );
};
