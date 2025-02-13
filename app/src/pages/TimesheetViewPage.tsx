import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { getTimesheetById } from "../api";
import type { Timesheet, Employee } from "../types";

export default function TimesheetViewPage() {
  const { id } = useParams<{ id: string }>();
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);

  useEffect(() => {
    const fetchTimesheet = async () => {
      if (id) {
        const data = await getTimesheetById(id);
        setTimesheet(data);
      }
    };
    fetchTimesheet();
  }, [id]);

  if (!timesheet) {
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

  return (
    <Box sx={{ margin: "2rem" }}>
      <Paper sx={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Timesheet Details
        </Typography>
        <Typography>
          <strong>Employee:</strong>{" "}
          {timesheet.employee?.name || "Unknown Employee"}
        </Typography>
        <Typography>
          <strong>Start Time:</strong>{" "}
          {new Date(timesheet.startTime).toLocaleString()}
        </Typography>
        <Typography>
          <strong>End Time:</strong>{" "}
          {new Date(timesheet.endTime).toLocaleString()}
        </Typography>
        <Typography>
          <strong>Summary:</strong> {timesheet.summary}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" href="/timesheets">
            Back to Timesheets
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
