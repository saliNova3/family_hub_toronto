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
        boxShadow: "0px -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Main Attribution */}
      <Typography variant="body2" sx={{ fontWeight: 300 }}>
        © {new Date().getFullYear()} Toronto Family Hub. All rights reserved.
      </Typography>

      {/* Links Row */}
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
              color: "#ffffff",
            },
          },
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

      {/* Open Data Attribution */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 300 }}>
          Data provided by the{" "}
          <a
            href="https://open.toronto.ca/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9fafca", textDecoration: "none" }}
          >
            City of Toronto Open Data Portal
          </a>
          . Licensed under the{" "}
          <a
            href="https://open.toronto.ca/open-data-licence/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9fafca", textDecoration: "none" }}
          >
            Open Data Licence
          </a>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
