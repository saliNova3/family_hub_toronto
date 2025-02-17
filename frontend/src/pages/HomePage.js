// src/pages/HomePage.jsx

import React from 'react';
import { Container, Box, Typography, Button, useTheme } from '@mui/material';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          backgroundColor: "#304058",
          minHeight: "80vh",
          borderRadius: 2,
          boxShadow: 3,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: "#BCE8C2",
              mb: 4,
              [theme.breakpoints.down('sm')]: { fontSize: '2rem' },
            }}
          >
            Welcome to Toronto Family Hub
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#BCE8C2",
              mb: 8,
              maxWidth: 800,
              px: 2,
            }}
          >
            Discover early childhood and family centres across Toronto. Our platform provides detailed information and search functionality to help you find the best options for your family.
          </Typography>
          <Box
            component="img"
            src="https://via.placeholder.com/800x400"
            alt="Home illustration"
            sx={{
              mb: 8,
              width: '100%',
              maxWidth: 800,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#46A897",
              '&:hover': { backgroundColor: "#304058" },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
