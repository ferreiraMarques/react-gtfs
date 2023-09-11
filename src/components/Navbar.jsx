import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Home
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/upload"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Upload
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
