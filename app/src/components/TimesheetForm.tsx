import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";
import type { Employee, Timesheet } from "../types";
import {
  getEmployees,
  getTimesheetById,
  createTimesheet,
  updateTimesheet,
} from "../api";

export default function TimesheetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timesheet, setTimesheet] = useState<Timesheet>({
    employee: {} as Employee,
    startTime: "",
    endTime: "",
    summary: "" as string,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await getEmployees();
      setEmployees(employeesData);

      if (id) {
        const timesheetData = await getTimesheetById(id);
        if (timesheetData) {
          setTimesheet(timesheetData);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (new Date(timesheet.startTime) >= new Date(timesheet.endTime)) {
      newErrors.startTime = "Start time must be before end time!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (id) {
      await updateTimesheet(id, timesheet);
    } else {
      await createTimesheet(timesheet);
    }

    navigate("/timesheets");
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "employee") {
      const selectedEmployee = employees.find((emp) => emp._id === value);
      setTimesheet({
        ...timesheet,
        employee: selectedEmployee || ({} as Employee),
      });
      setErrors({ ...errors, [field]: "" });
    } else {
      setTimesheet({ ...timesheet, [field]: value });
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ margin: "3rem 0" }}
      >
        {id ? "Edit Timesheet" : "New Timesheet"}
      </Typography>
      <Box sx={{ width: "400px", margin: "auto", marginTop: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Employee"
            value={timesheet.employee?._id || ""}
            onChange={(e) => handleInputChange("employee", e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.employee}
            helperText={errors.employee}
          >
            {employees.map((emp) => (
              <MenuItem key={emp._id} value={emp._id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="datetime-local"
            label="Start Time"
            value={timesheet.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            error={!!errors.startTime}
            helperText={errors.startTime}
          />
          <TextField
            type="datetime-local"
            label="End Time"
            value={timesheet.endTime}
            onChange={(e) => handleInputChange("endTime", e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.endTime}
            helperText={errors.endTime}
          />
          <TextField
            label="Summary"
            multiline
            rows={3}
            value={timesheet.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.summary}
            helperText={errors.summary}
          />
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </>
  );
}
