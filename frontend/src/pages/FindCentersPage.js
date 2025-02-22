import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import { geocodeAddress, fetchNearestCenters } from "../services/api";
import { useNavigate } from "react-router-dom";


const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY;

// Flag to track if the script is already loaded
let isScriptLoaded = false;
let scriptLoadingPromise = null;

// Function to load the Google Maps script only once
const loadGoogleMapsScript = () => {
  if (scriptLoadingPromise) return scriptLoadingPromise;
  
  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (isScriptLoaded) {
      resolve(window.google);
      return;
    }
    
    // Check if script is already in the document
    if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
      isScriptLoaded = true;
      if (window.google) {
        resolve(window.google);
      } else {
        // If script exists but google object not ready, wait for it
        const checkGoogleInterval = setInterval(() => {
          if (window.google) {
            clearInterval(checkGoogleInterval);
            isScriptLoaded = true;
            resolve(window.google);
          }
        }, 100);
      }
      return;
    }
    
    // Otherwise, load the script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsCallback`;
    script.async = true;
    script.defer = true;
    
    // Define callback
    window.googleMapsCallback = () => {
      isScriptLoaded = true;
      resolve(window.google);
    };
    
    script.onerror = () => {
      reject(new Error("Google Maps script loading failed"));
    };
    
    document.head.appendChild(script);
  });
  
  return scriptLoadingPromise;
};

function FindCentersPage() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAutocompleteInitialized, setIsAutocompleteInitialized] = useState(false);
  
  // Store a reference to the autocomplete object
  const autocompleteRef = useRef(null);
  // Reference to the text field input
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // Initialize autocomplete when component mounts
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.warn("Google Maps API key is missing. Autocomplete won't work.");
      return;
    }

    const initializeAutocomplete = async () => {
      try {
        await loadGoogleMapsScript();
        if (inputRef.current && !isAutocompleteInitialized) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
              componentRestrictions: { country: ["ca"] },
              fields: ["address_components", "geometry", "formatted_address"],
              types: ["address"],
            }
          );
          autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
          setIsAutocompleteInitialized(true);
        }
      } catch (error) {
        console.error("Failed to initialize autocomplete:", error);
        setErrorMessage("Unable to initialize address autocomplete.");
      }
    };

    initializeAutocomplete();

    // Clean up function
    return () => {
      if (autocompleteRef.current && isAutocompleteInitialized) {
        // Remove any listeners if needed
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isAutocompleteInitialized]);

  // Handle place selection from autocomplete dropdown
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) {
      setErrorMessage("Please select an address from the dropdown.");
      return;
    }

    setAddress(place.formatted_address);
  };

  // Handle search submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      setErrorMessage("Please enter an address or postal code to search.");
      return;
    }

    setErrorMessage("");
    setResults([]);
    setIsLoading(true);

    try {
      const coords = await geocodeAddress(address);
      console.log("Geocoded coordinates:", coords);

      const centers = await fetchNearestCenters(coords.lat, coords.lng);
      setResults(centers);
    } catch (error) {
      setErrorMessage(error.message || "Failed to find centers near this location.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle using user's current location
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
          setErrorMessage(error.message || "Failed to find centers near your location.");
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

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        {/* Title Section */}
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
        <Box
          component="form"
          onSubmit={handleAddressSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            inputRef={inputRef}
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
              minWidth: { xs: "100%", sm: "150px" },
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
          sx={{
            borderRadius: 2,
            py: 1.5,
            borderColor: "#2e3b55",
            color: "#2e3b55",
            "&:hover": { borderColor: "#1e2b45", backgroundColor: "rgba(46, 59, 85, 0.04)" },
            mb: 2,
          }}
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
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: "#f8f9fa",
              border: "1px dashed #cfd8dc",
            }}
          >
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
                  key={center.loc_id || idx}
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      boxShadow: 3,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 2, sm: 3 },
                      "&:last-child": { pb: { xs: 2, sm: 3 } },
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          color: "#2e3b55",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          fontWeight: 500,
                        }}
                      >
                        {center.program_name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
                        <PlaceIcon sx={{ color: "#5a6a85", fontSize: "0.9rem", mr: 0.5, mt: 0.3 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#5a6a85",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          }}
                        >
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
                        },
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