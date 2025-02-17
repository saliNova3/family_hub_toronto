
const API_BASE_URL = "http://127.0.0.1:8000/api"; 

// Function to get cached centres data
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

// Function to refresh centres cache (if needed)
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
