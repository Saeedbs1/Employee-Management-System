import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Navbar } from "../../src/components/Navbar";
import { EmployeesPage } from "../../src/pages/EmployeesPage";
import TimesheetsRoute from "./timesheets";
import TimesheetFormRoute from "./timesheetForm";
import EmployeeViewRoute from "./employeeView";
import TimesheetViewRoute from "./timesheetView";
import AddEmployeeRoute from "./addEmployee";
import EditEmployeePage from "./editEmployee";
import { getEmployees } from "../../src/api";
import type { Employee } from "../../src/types";

const NotFoundPage = () => <div>404 - Page Not Found</div>;

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<EmployeesPage employees={employees} />}
              />
              <Route path="employees/:id" element={<EmployeeViewRoute />} />
              <Route path="employees/new" element={<AddEmployeeRoute />} />
              <Route path="employees/edit/:id" element={<EditEmployeePage />} />
              <Route path="timesheets" element={<TimesheetsRoute />} />
              <Route path="timesheets/new" element={<TimesheetFormRoute />} />
              <Route path="timesheets/:id" element={<TimesheetViewRoute />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}
