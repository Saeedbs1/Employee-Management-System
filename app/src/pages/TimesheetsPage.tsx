import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { getTimesheets, getEmployees } from "../api";
import TimesheetsTable from "../components/TimesheetsTable";
import TimesheetsCalendar from "../components/TimesheetsCalendar";
import type { Timesheet, Employee } from "../types";

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [view, setView] = useState("table");

  useEffect(() => {
    const fetchData = async () => {
      const timesheetsData = await getTimesheets();
      const employeesData = await getEmployees();
      setTimesheets(timesheetsData);
      setEmployees(employeesData);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ margin: "3rem 0" }}
      >
        Timesheets
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Button variant="contained" href="/timesheets/new">
          New Timesheet
        </Button>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => setView(newView || "table")}
        >
          <ToggleButton value="table">Table View</ToggleButton>
          <ToggleButton value="calendar">Calendar View</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {view === "table" ? (
        <TimesheetsTable timesheets={timesheets} employees={employees} />
      ) : (
        <TimesheetsCalendar timesheets={timesheets} employees={employees} />
      )}
    </Box>
  );
}
