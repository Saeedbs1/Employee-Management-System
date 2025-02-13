import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById } from "../../src/api";
import type { Employee } from "../types";

export const EmployeeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchEmployee = async () => {
      try {
        const fetchedEmployee = await getEmployeeById(id);
        setEmployee(fetchedEmployee);
      } catch (error) {
        setError("Failed to fetch employee details. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

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
      <Paper sx={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Employee Details
        </Typography>
        <Typography>
          <strong>Name:</strong> {employee.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {employee.email}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {employee.phone}
        </Typography>
        <Typography>
          <strong>Date of Birth:</strong> {employee.dateOfBirth}
        </Typography>
        <Typography>
          <strong>Job Title:</strong> {employee.jobTitle}
        </Typography>
        <Typography>
          <strong>Department:</strong> {employee.department}
        </Typography>
        <Typography>
          <strong>Salary:</strong> ${employee.salary}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {employee.startDate}
        </Typography>
        {employee.photo && (
          <Box>
            <Typography>
              <strong>Photo:</strong>
            </Typography>
            <Box sx={{ margin: 2 }}>
              <img
                src={`/${employee.photo}`}
                alt="Employee Photo"
                width="200"
              />
            </Box>
          </Box>
        )}
        {employee.documents && employee.documents.length > 0 && (
          <Box>
            <Typography>
              <strong>Documents:</strong>
            </Typography>
            <List>
              {employee.documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <a
                        href={`/${doc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Document {index + 1}
                      </a>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Box sx={{ mt: 5 }}>
          <Button variant="contained" href="/">
            Back to Employees
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
