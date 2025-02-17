import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#212C4B",
        color: "white",
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Toronto Family Hub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
