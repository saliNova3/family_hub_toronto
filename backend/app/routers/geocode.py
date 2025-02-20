from fastapi import APIRouter, HTTPException
from app.models.geocode import GeocodeRequest, GeocodeResponse
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

router = APIRouter()

@router.post("/geocode", response_model=GeocodeResponse)
async def geocode_address(request: GeocodeRequest):
    # Get your API key from the environment
    api_key = os.getenv("GOOGLE_GEOCODING_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Geocoding API key not configured")

    # Define the Google Geocoding API endpoint
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    
    # Prepare parameters for the API call
    params = {
        "address": request.address,
        "key": api_key
    }
    
    # Make the request to the geocoding API
    response = requests.get(base_url, params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error calling geocoding service")
    
    data = response.json()
    if data.get("status") != "OK" or not data.get("results"):
        error_message = data.get("error_message", "Unable to geocode the address")
        raise HTTPException(status_code=400, detail=f"Geocoding error: {error_message}")
    
    # Extract latitude and longitude from the first result
    location = data["results"][0]["geometry"]["location"]
    return GeocodeResponse(lat=location["lat"], lng=location["lng"])