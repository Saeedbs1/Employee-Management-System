import { EmployeeList } from "../components/EmployeeList";
import {
  Button,
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Employee } from "../../src/types";
import { getEmployees } from "../api"; 

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fetchedEmployees = await getEmployees();
        setEmployees(fetchedEmployees);
      } catch (err) {
        setError("Failed to fetch employees. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const filteredEmployeeData = useMemo(
    () =>
      employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput, employees]
  );

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

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ margin: "3rem 0" }}
      >
        Employees
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem 0",
        }}
      >
        <Button component={Link} to="/employees/new" variant="contained">
          Add Employee
        </Button>
        <TextField
          label="Search Employee"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchInputChange}
          id="searchEmployeeInput"
        />
      </Box>
      <EmployeeList employees={filteredEmployeeData} />
    </Box>
  );
};
