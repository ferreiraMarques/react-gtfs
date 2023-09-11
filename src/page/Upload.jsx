import { Button, Card, Container } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";

export default function Upload() {
  return (
    <Container>
      <Navbar />
      <Card variant="outlined">
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Card>
    </Container>
  );
}
