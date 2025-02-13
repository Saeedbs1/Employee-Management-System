import { EmployeeList } from "../components/EmployeeList";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Employee } from "../../src/types";

interface EmployeesPageProps {
  employees: Employee[];
}

export const EmployeesPage = ({ employees }: EmployeesPageProps) => {
  const [searchInput, setSearchInput] = useState("");

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

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ margin: 5}}>
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
