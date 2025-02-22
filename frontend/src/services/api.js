const API_BASE_URL = process.env.REACT_APP_BACKEND_URL ||  "http://127.0.0.1:8000/api";


export const getCachedCentres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/centres/cached`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cached centres data:", error);
    throw error;
  }
};

export const refreshCentresCache = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/centres/refresh`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error refreshing centres cache:", error);
    throw error;
  }
};

export async function geocodeAddress(address) {
  try {
    console.log("Requesting geocode for:", address);
    const response = await fetch(`${API_BASE_URL}/geocode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in geocodeAddress:", error);
    throw error;
  }
}

export async function fetchNearestCenters(lat, lng, max_distance = 5000) {
  try {
    const response = await fetch(`${API_BASE_URL}/centres/near`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng, max_distance }),
    });
    if (!response.ok) {
      throw new Error(`Fetching centers failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchNearestCenters:", error);
    throw error;
  }
}