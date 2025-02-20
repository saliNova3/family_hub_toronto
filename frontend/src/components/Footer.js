import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        padding: "1.5rem 0",
        backgroundColor: "#2e3b55", // Modern dark blue-gray
        color: "#f8f9fa",
        textAlign: "center",
        marginTop: "auto",
        boxShadow: "0px -2px 10px rgba(0,0,0,0.05)"
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 300 }}>
        © {new Date().getFullYear()} Toronto Family Hub. All rights reserved.
      </Typography>
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 3, 
          mt: 1,
          "& a": {
            color: "#9fafca",
            textDecoration: "none",
            transition: "color 0.2s",
            "&:hover": {
              color: "#ffffff"
            }
          }
        }}
      >
        <Typography variant="body2" component="a" href="/privacy">
          Privacy Policy
        </Typography>
        <Typography variant="body2" component="a" href="/terms">
          Terms of Service
        </Typography>
        <Typography variant="body2" component="a" href="/contact">
          Contact Us
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;