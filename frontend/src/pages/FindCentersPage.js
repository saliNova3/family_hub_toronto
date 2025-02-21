
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import { geocodeAddress, fetchNearestCenters } from "../services/api";
import { useNavigate } from "react-router";

function FindCentersPage() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  // Handle address search
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    
    // Validate address input
    if (!address.trim()) {
      setErrorMessage("Please enter an address or postal code to search.");
      return;
    }
    
    setErrorMessage("");
    setResults([]);
    setIsLoading(true);
    try {
      // Get coordinates from geocoding endpoint
      const coords = await geocodeAddress(address);
      console.log("Geocoded coordinates:", coords);
      // Use the coordinates to fetch nearest centers
      const centers = await fetchNearestCenters(coords.lat, coords.lng);
      setResults(centers);
    } catch (error) {
      setErrorMessage(error.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle use of geolocation directly
  const handleUseMyLocation = async () => {
    setErrorMessage("");
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's location:", latitude, longitude);
        try {
          const centers = await fetchNearestCenters(latitude, longitude);
          setResults(centers);
        } catch (error) {
          setErrorMessage(error.message);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setErrorMessage("Unable to retrieve your location.");
        setIsLoading(false);
      }
    );
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 5 }}>
          <LocationOnIcon sx={{ fontSize: 48, color: "#2e3b55", mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: "#2e3b55", textAlign: "center" }}>
            Find Family Centers
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#5a6a85", textAlign: "center", maxWidth: 600, mb: 4 }}>
            Discover nearby family support centers and resources in Toronto to help your family thrive.
          </Typography>
        </Box>

        {/* Address Search Form */}
        <Box component="form" onSubmit={handleAddressSubmit} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 3 }}>
          <TextField
            label="Enter your address or postal code"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#f8f9fa" } }}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1 }}>
                  <SearchIcon sx={{ color: "#2e3b55" }} />
                </Box>
              ),
            }}
          />
          <Button 
              type="submit" 
              variant="contained" 
              disabled={isLoading} 
              sx={{ 
                borderRadius: 2, 
                py: 1.5, 
                backgroundColor: "#2e3b55", 
                "&:hover": { backgroundColor: "#1e2b45" }, 
                minWidth: { xs: "100%", sm: "150px" } 
              }}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
        </Box>

        {/* Geolocation Button */}
        <Button
          variant="outlined"
          onClick={handleUseMyLocation}
          disabled={isLoading}
          startIcon={<MyLocationIcon />}
          sx={{ borderRadius: 2, py: 1.5, borderColor: "#2e3b55", color: "#2e3b55", "&:hover": { borderColor: "#1e2b45", backgroundColor: "rgba(46, 59, 85, 0.04)" }, mb: 2 }}
          fullWidth
        >
          Use My Current Location
        </Button>

        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body1" sx={{ color: "red", mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
            <Typography variant="body1">Searching for centers...</Typography>
          </Box>
        )}

        {/* Results Section */}
        {!isLoading && results.length === 0 && !errorMessage && (
          <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3, backgroundColor: "#f8f9fa", border: "1px dashed #cfd8dc" }}>
            <Typography variant="body1" sx={{ color: "#5a6a85" }}>
              Enter your address or use your location to find family centers near you.
            </Typography>
          </Paper>
        )}

{!isLoading && results.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#2e3b55", mb: 3 }}>
      Centers Near You
    </Typography>
    
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {results.map((center, idx) => (
        <Card 
          key={center.loc_id} 
          elevation={1}
          sx={{
            borderRadius: 2,
            transition: "all 0.3s ease",
            border: "1px solid #e0e0e0",
            "&:hover": {
              boxShadow: 3,
              transform: "translateY(-2px)"
            }
          }}
        >
          <CardContent sx={{ 
            p: { xs: 2, sm: 3 },
            "&:last-child": { pb: { xs: 2, sm: 3 } },
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            alignItems: { sm: "center" },
            justifyContent: "space-between"
          }}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" component="h3" sx={{ 
                color: "#2e3b55",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                fontWeight: 500
              }}>
                {center.program_name}
              </Typography>
              
              <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
                <PlaceIcon sx={{ color: "#5a6a85", fontSize: "0.9rem", mr: 0.5, mt: 0.3 }} />
                <Typography variant="body2" sx={{ 
                  color: "#5a6a85",
                  fontSize: { xs: "0.875rem", sm: "1rem" }
                }}>
                  {center.full_address}
                </Typography>
              </Box>
            </Box>
            
            <Button
              onClick={() => navigate(`/centres/loc/${center.loc_id}`)}
              variant="outlined"
              size="medium"
              endIcon={<LocationOnIcon />}
              aria-label={`View more details about ${center.program_name}`}
              sx={{
                borderColor: "#2e3b55",
                color: "#2e3b55",
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: 1,
                minWidth: { xs: "100%", sm: "auto" },
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(46, 59, 85, 0.04)",
                  borderColor: "#1e2b45",
                }
              }}
            >
              More Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
)}
      </Paper>
    </Container>
  );
}

export default FindCentersPage;
