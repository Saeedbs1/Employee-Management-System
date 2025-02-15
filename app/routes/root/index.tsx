import { useEffect, useState } from "react";
import { Navbar } from "../../src/components/Navbar";
import { EmployeesPage } from "../../src/pages/EmployeesPage";

export default function App() {


  return (
    <>
      <Navbar />
      <EmployeesPage />
    </>
  );
}
