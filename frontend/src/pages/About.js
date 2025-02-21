import React from 'react';
import { Box, Container, Typography, Link, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          About Toronto Family Hub
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 4 }}>
          Data Sources & Attribution
        </Typography>
        
        <Typography variant="body1" paragraph>
          Our application uses Open Data from the{' '}
          <Link href="https://open.toronto.ca/" target="_blank" rel="noopener noreferrer">
            City of Toronto
          </Link>
          . This data is provided under the{' '}
          <Link href="https://open.toronto.ca/open-data-licence/" target="_blank" rel="noopener noreferrer">
            Open Data Licence
          </Link>
          , in accordance with the City of Toronto's{' '}
          <Link href="https://open.toronto.ca/open-data-policy/" target="_blank" rel="noopener noreferrer">
            Open Data Policy
          </Link>
          .
        </Typography>
        
        <Typography variant="h6" component="h3" sx={{ mb: 2, mt: 4 }}>
          Key Points
        </Typography>
        
        <List sx={{ mb: 4 }}>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary="We adhere to privacy, security, and confidentiality requirements per MFIPPA and PHIPA." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary="Data is published to improve government transparency and community engagement." />
          </ListItem>
          <ListItem sx={{ pl: 0 }}>
            <ListItemText primary="All data is used responsibly, with no personal or sensitive information stored." />
          </ListItem>
        </List>
        
        <Typography variant="body2" sx={{ mt: 6, color: 'text.secondary' }}>
          Last Updated: September 2023
        </Typography>
      </Box>
    </Container>
  );
};

export default About;