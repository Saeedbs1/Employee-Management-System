import { useState } from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";
import type { Employee } from "../types";
import { addEmployee } from "../api";
import { Box, Typography } from "@mui/material";

export const AddEmployeePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmployeeSubmit = async (employeeData: FormData) => {
    setIsSubmitting(true);
    try {
      const newEmployee = await addEmployee(employeeData);
      if (newEmployee) {
        navigate("/");
      }
    } catch (error) {
      alert("There was an error adding the employee.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
        Add New Employee
      </Typography>
      <EmployeeForm onSubmit={handleEmployeeSubmit} />
    </Box>
  );
};
