import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Grid,
  Divider,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Link,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WebIcon from "@mui/icons-material/Web";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MapIcon from "@mui/icons-material/Map";
import DirectionsIcon from "@mui/icons-material/Directions";

function CenterDetailsPage() {
  const { loc_id } = useParams();
  const [center, setCenter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const API_BASE_URL =  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/api";

  useEffect(() => {
    async function fetchCenter() {
      try {
        const response = await fetch(`${API_BASE_URL}/centres/loc/${loc_id}`);
        if (!response.ok) {
          throw new Error(`Error fetching center: ${response.statusText}`);
        }
        const data = await response.json();
        setCenter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCenter();
  }, [loc_id]);

  // Create Google Maps URL from address
  const getGoogleMapsUrl = (address) => {
    if (!address) return '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // Format hours function
  const formatSchedule = (scheduleText) => {
    if (!scheduleText) return [];
    
    // Split by pipe or semicolon to get day segments
    const segments = scheduleText.split(/\|/);
    return segments.map(segment => {
      // Split each segment into day and hours
      const parts = segment.split(':');
      if (parts.length < 2) return { day: segment.trim(), times: [] };
      
      const day = parts[0].trim();
      const timesText = parts.slice(1).join(':').trim();
      const times = timesText.split(';').map(t => t.trim());
      
      return { day, times };
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh" }}>
          <CircularProgress size={60} sx={{ color: "#2e3b55", mb: 3 }} />
          <Typography variant="h6" sx={{ color: "#5a6a85" }}>Loading center details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mt: 8, p: 4, backgroundColor: "#fff8f8", borderRadius: 2 }}>
          <Typography variant="h5" color="error" gutterBottom>Unable to Load Center Details</Typography>
          <Typography color="textSecondary">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!center) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mt: 8, p: 4, backgroundColor: "#f5f7fa", borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: "#2e3b55" }}>Center not found</Typography>
          <Typography color="textSecondary" sx={{ mt: 2 }}>The requested center information could not be found.</Typography>
        </Box>
      </Container>
    );
  }

  const dropInSchedule = formatSchedule(center.dropinHours);
  const registeredSchedule = formatSchedule(center.registeredHours);
  const mapUrl = getGoogleMapsUrl(center.full_address);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 3, 
          overflow: "hidden",
          mb: 4,
          backgroundColor: "#fff" 
        }}
      >
        {/* Header Section */}
        <Box 
          sx={{ 
            bgcolor: "#2e3b55", 
            color: "white", 
            p: { xs: 3, md: 4 },
            pb: { xs: 4, md: 5 }
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            {center.program_name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
            <PlaceIcon sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
            <Box>
              <Typography variant="body1">
                {center.full_address}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<MapIcon />}
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    bgcolor: "rgba(255,255,255,0.15)", 
                    "&:hover": { bgcolor: "rgba(255,255,255,0.25)" }
                  }}
                >
                  View on Maps
                </Button>
                <Tooltip title="Get directions">
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<DirectionsIcon />}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(center.full_address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      "&:hover": { 
                        borderColor: "rgba(255,255,255,0.6)",
                        bgcolor: "rgba(255,255,255,0.05)"
                      }
                    }}
                  >
                    Directions
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {/* Left Column - Contact Info */}
            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 3, borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#2e3b55" }}>
                    Contact Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  {center.contact_fullname && (
                    <Box sx={{ display: "flex", mb: 2.5, alignItems: "flex-start" }}>
                      <Avatar sx={{ bgcolor: "rgba(46,59,85,0.1)", color: "#2e3b55", width: 40, height: 40, mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Contact Person</Typography>
                        <Typography variant="body1">{center.contact_fullname}</Typography>
                        {center.contact_title && (
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                            {center.contact_title}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {center.phone && (
                    <Box sx={{ display: "flex", mb: 2.5, alignItems: "flex-start" }}>
                      <Avatar sx={{ bgcolor: "rgba(46,59,85,0.1)", color: "#2e3b55", width: 40, height: 40, mr: 2 }}>
                        <PhoneIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Phone</Typography>
                        <Link 
                          href={`tel:${center.phone}`} 
                          variant="body1"
                          sx={{ 
                            color: "#2e3b55", 
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            "&:hover": { textDecoration: "underline" }
                          }}
                        >
                          {center.phone}
                        </Link>
                      </Box>
                    </Box>
                  )}

                  {center.email && (
                    <Box sx={{ display: "flex", mb: 2.5, alignItems: "flex-start" }}>
                      <Avatar sx={{ bgcolor: "rgba(46,59,85,0.1)", color: "#2e3b55", width: 40, height: 40, mr: 2 }}>
                        <EmailIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Email</Typography>
                        <Link 
                          href={`mailto:${center.email}`} 
                          variant="body1"
                          sx={{ 
                            color: "#2e3b55", 
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" }
                          }}
                        >
                          {center.email}
                        </Link>
                      </Box>
                    </Box>
                  )}

                  {center.website && (
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Avatar sx={{ bgcolor: "rgba(46,59,85,0.1)", color: "#2e3b55", width: 40, height: 40, mr: 2 }}>
                        <WebIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="textSecondary">Website</Typography>
                        <Link 
                          href={center.website} 
                          target="_blank" 
                          rel="noreferrer"
                          variant="body1"
                          sx={{ 
                            color: "#2e3b55", 
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" }
                          }}
                        >
                          {center.website_name || center.website}
                        </Link>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Quick Action Buttons for Mobile */}
              {isMobile && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {center.phone && (
                    <Grid item xs={6}>
                      <Button 
                        variant="contained" 
                        startIcon={<PhoneIcon />}
                        fullWidth
                        href={`tel:${center.phone}`}
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          bgcolor: "#2e3b55",
                          "&:hover": { bgcolor: "#1e2b45" }
                        }}
                      >
                        Call
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={center.phone ? 6 : 12}>
                    <Button 
                      variant="outlined" 
                      startIcon={<DirectionsIcon />}
                      fullWidth
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(center.full_address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2,
                        borderColor: "#2e3b55",
                        color: "#2e3b55",
                        "&:hover": { 
                          borderColor: "#1e2b45",
                          bgcolor: "rgba(46, 59, 85, 0.04)"
                        }
                      }}
                    >
                      Directions
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>

            {/* Right Column - Schedule */}
            <Grid item xs={12} md={7}>
              {/* Drop-in Hours */}
              {center.dropinHours && (
                <Card sx={{ mb: 3, borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <AccessTimeIcon sx={{ color: "#2e3b55", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2e3b55" }}>
                        Drop-In Hours
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={2}>
                      {dropInSchedule.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Card variant="outlined" sx={{ mb: 1, borderRadius: 2, bgcolor: "rgba(46,59,85,0.03)" }}>
                            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#2e3b55", mb: 1 }}>
                                {item.day}
                              </Typography>
                              {item.times.map((time, idx) => (
                                <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: idx < item.times.length - 1 ? 1 : 0 }}>
                                  <CalendarTodayIcon sx={{ fontSize: 16, color: "#5a6a85", mr: 1 }} />
                                  <Typography variant="body2" color="textSecondary">
                                    {time}
                                  </Typography>
                                </Box>
                              ))}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Registered Hours */}
              {center.registeredHours && (
                <Card sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <AccessTimeIcon sx={{ color: "#2e3b55", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2e3b55" }}>
                        Registered Hours
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Grid container spacing={2}>
                      {registeredSchedule.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Card variant="outlined" sx={{ mb: 1, borderRadius: 2, bgcolor: "rgba(46,59,85,0.03)" }}>
                            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#2e3b55", mb: 1 }}>
                                {item.day}
                              </Typography>
                              {item.times.map((time, idx) => (
                                <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: idx < item.times.length - 1 ? 1 : 0 }}>
                                  <CalendarTodayIcon sx={{ fontSize: 16, color: "#5a6a85", mr: 1 }} />
                                  <Typography variant="body2" color="textSecondary">
                                    {time}
                                  </Typography>
                                </Box>
                              ))}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Back to Results Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => window.history.back()}
          sx={{ 
            borderRadius: 2, 
            px: 4, 
            borderColor: "#2e3b55", 
            color: "#2e3b55",
            "&:hover": { borderColor: "#1e2b45", backgroundColor: "rgba(46, 59, 85, 0.04)" }
          }}
        >
          Back to Results
        </Button>
      </Box>
    </Container>
  );
}

export default CenterDetailsPage;