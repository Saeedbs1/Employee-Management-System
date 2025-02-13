import { useEffect, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { createCalendar, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import type { Timesheet, Employee } from "../types";



export default function TimesheetsCalendar({
  timesheets,
  employees,
}: {
  timesheets: Timesheet[];
  employees: Employee[];
}) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let calendar: any;

    if (calendarRef.current) {
      const employeeColors = new Map(
        employees.map((emp, index) => [emp._id,index])
      );

      const events = timesheets
        .filter((ts) => ts._id)
        .map((ts) => {
          const employee = employees.find((emp) => emp._id == ts.employee?._id);
          const color = employee ? employeeColors.get(employee._id) : "";

          return {
            id: ts._id as string,
            title: employee?.name || "Unknown Employee",
            start: ts.startTime.replace("T", " ").slice(0, 16),
            end: ts.endTime.replace("T", " ").slice(0, 16),
            color: color,
          };
        });

      calendar = createCalendar({
        views: [createViewMonthGrid()],
        events,
        defaultView: "month",
      });

      calendar.render(calendarRef.current);
    }

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, [timesheets, employees]);

  return (
    <Box>
      <div
        id="calendar"
        ref={calendarRef}
        style={{ marginBottom: "20px" }}
      ></div>
    </Box>
  );
}
