import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Box } from "@mui/material";

import MenuAppBar from "./Components/Appbar/Appbar";
import Home from "./Pages/Home";

function AppRouter() {
  return (
    <Router>
      <MenuAppBar />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 10,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default AppRouter;
