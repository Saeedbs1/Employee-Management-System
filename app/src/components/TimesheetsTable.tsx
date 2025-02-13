import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type { Timesheet, Employee } from "../types";

export default function TimesheetsTable({
  timesheets,
  employees,
}: {
  timesheets: Timesheet[];
  employees: Employee[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const getEmployeeName = (ts: Timesheet) => {
    if (typeof ts.employee === "object" && ts.employee !== null) {
      return (ts.employee as Employee).name;
    }
    const employee = employees.find((emp) => emp?._id == ts.employee?._id);
    return employee?.name || "Unknown";
  };

  const filteredTimesheets = timesheets.filter((ts) => {
    const employeeName = getEmployeeName(ts).toLowerCase();
    return employeeName.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTimesheets.map((ts) => (
            <TableRow key={ts._id}>
              <TableCell>{getEmployeeName(ts)}</TableCell>
              <TableCell>{new Date(ts.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(ts.endTime).toLocaleString()}</TableCell>
              <TableCell>{ts.summary}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" href={`/timesheets/${ts._id}`}>
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    href={`/timesheets/edit/${ts._id}`}
                  >
                    Edit
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
