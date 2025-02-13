import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import type { Employee } from "../types";
import { deleteEmployee, getEmployees } from "../api";

interface EmployeeListProps {
  employees: Employee[];
}

export const EmployeeList = ({ employees }: EmployeeListProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);

  const handleDelete = async (id: string) => {
    await deleteEmployee(id);
    const updatedEmployees = await getEmployees();
    setEmployeeList(updatedEmployees);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      sortable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "department",
      headerName: "Department",
      sortable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 250,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
          <Button
            component={Link}
            to={`/employees/${params.row.id}`}
            variant="contained"
            color="primary"
            sx={{ fontSize: "0.7rem" }}
          >
            View
          </Button>
          <Button
            component={Link}
            to={`/employees/edit/${params.row.id}`}
            variant="contained"
            color="secondary"
            sx={{ fontSize: "0.7rem" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            variant="contained"
            color="error"
            sx={{ fontSize: "0.7rem" }}
          >
            Delete
          </Button>
        </Box>
      ),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows: GridRowsProp = useMemo(
    () =>
      employeeList.map((employee) => ({
        id: employee._id,
        name: employee.name,
        email: employee.email,
        jobTitle: employee.jobTitle,
        department: employee.department,
      })),
    [employeeList]
  );

  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(newPaginationModel) =>
          setPaginationModel(newPaginationModel)
        }
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Box>
  );
};
