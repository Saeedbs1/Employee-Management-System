export interface Employee {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jobTitle: string;
  department: string;
  salary: number;
  startDate: string;
  endDate?: string;
  photo?: File | null;
  documents?: File[];
}

export interface Timesheet {
  _id?: string;
  employee: Employee;
  startTime: string;
  endTime: string;
  summary?: string;
}
