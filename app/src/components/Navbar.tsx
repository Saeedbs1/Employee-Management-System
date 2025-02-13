import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Employee Management System</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button color="inherit" component={Link} to="/" variant="outlined">
              Employees
            </Button>
            <Button
              component={Link}
              to="/timesheets"
              variant="outlined"
              color="inherit"
            >
              Timesheets
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
