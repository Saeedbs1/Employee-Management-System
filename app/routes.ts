import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root/index.tsx"),
  route("employees/:id", "routes/root/employeeView.tsx"),
  route("employees/new", "routes/root/addEmployee.tsx"),
  route("employees/edit/:id", "routes/root/editEmployee.tsx"),
  route("timesheets", "routes/root/timesheets.tsx"),
  route("timesheets/new", "routes/root/timesheetForm.tsx"),
  route("timesheets/:id", "routes/root/timesheetView.tsx"),
  route("timesheets/edit/:id", "src/pages/EditTimesheetPage.tsx"),
] satisfies RouteConfig;
