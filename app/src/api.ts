const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jobTitle: string;
  department: string;
  salary: number;
  startDate: string;
}

interface Timesheet {
  id: string;
  employee: Employee;
  startTime: string;
  endTime: string;
  summary: string;
}

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch employee with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    return null;
  }
};

export const addEmployee = async (
  employeeData: FormData
): Promise<Employee | null> => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      body: employeeData,
    });
    if (!response.ok) throw new Error("Failed to add employee");
    return await response.json();
  } catch (error) {
    console.error("Error adding employee:", error);
    return null;
  }
};

export const updateEmployee = async (
  id: string,
  employeeData: FormData
): Promise<Employee | null> => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: "PUT",
      body: employeeData,
    });
    if (!response.ok)
      throw new Error(`Failed to update employee with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    return null;
  }
};

export const deleteEmployee = async (
  id: string
): Promise<{ message: string } | null> => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: "DELETE",
    });
    if (!response.ok)
      throw new Error(`Failed to delete employee with ID ${id}`);

    return await response.json();
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    return null;
  }
};

export const getTimesheets = async (): Promise<Timesheet[]> => {
  try {
    const response = await fetch(`${API_URL}/timesheets`);
    if (!response.ok) throw new Error("Failed to fetch timesheets");
    return await response.json();
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    return [];
  }
};

export const getTimesheetById = async (
  id: string
): Promise<Timesheet | null> => {
  try {
    const response = await fetch(`${API_URL}/timesheets/${id}`);
    if (!response.ok)
      throw new Error(`Failed to fetch timesheet with ID ${id}`);
    const data = await response.json();
    return data as Timesheet;
  } catch (error) {
    console.error(`Error fetching timesheet with ID ${id}:`, error);
    return null;
  }
};

export const createTimesheet = async (
  timesheetData: Omit<Timesheet, "id">
): Promise<Timesheet | null> => {
  try {
    const response = await fetch(`${API_URL}/timesheets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timesheetData),
    });
    if (!response.ok) throw new Error("Failed to create timesheet");
    return await response.json();
  } catch (error) {
    console.error("Error creating timesheet:", error);
    return null;
  }
};

export const updateTimesheet = async (
  id: string,
  timesheetData: Partial<Timesheet>
): Promise<Timesheet | null> => {
  try {
    const response = await fetch(`${API_URL}/timesheets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timesheetData),
    });
    if (!response.ok)
      throw new Error(`Failed to update timesheet with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error updating timesheet with ID ${id}:`, error);
    return null;
  }
};
