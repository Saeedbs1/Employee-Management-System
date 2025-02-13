import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getEmployeeById, updateEmployee } from "../api";
import { EmployeeForm } from "../components/EmployeeForm";
import type { Employee } from "../types";

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const data = await getEmployeeById(id);
          setEmployee(data);
        } catch (error) {
          setError("Failed to fetch employee details. Please try again.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (updatedEmployee: FormData) => {
    if (id) {
      await updateEmployee(id, updatedEmployee);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
        Edit Employee
      </Typography>
      <EmployeeForm employee={employee} onSubmit={handleSubmit} />
    </Box>
  );
}
