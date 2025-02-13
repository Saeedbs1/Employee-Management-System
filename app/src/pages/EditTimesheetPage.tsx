import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getTimesheetById, updateTimesheet } from "../api";
import TimesheetForm from "../components/TimesheetForm";
import type { Timesheet } from "../types";

export default function EditTimesheetPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimesheet = async () => {
      if (id) {
        try {
          const data = await getTimesheetById(id);
          setTimesheet(data);
        } catch (error) {
          setError("Failed to fetch timesheet details. Please try again.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTimesheet();
  }, [id]);

  const handleSubmit = async (updatedTimesheet: Timesheet) => {
    if (id) {
      await updateTimesheet(id, updatedTimesheet);
      navigate("/timesheets");
    }
  };

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

  if (!timesheet) {
    return <div>Timesheet not found</div>;
  }

  return (
    <Box sx={{ margin: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>
        Edit Timesheet
      </Typography>
      <TimesheetForm timesheet={timesheet} onSubmit={handleSubmit} />
    </Box>
  );
}
