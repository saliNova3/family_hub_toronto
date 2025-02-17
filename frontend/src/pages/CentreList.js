import React, { useEffect, useState } from "react";
import { getCachedCentres, refreshCentresCache } from "../services/api";

const CentreList = () => {
  const [centres, setCentres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load cached data
  const loadCentres = async () => {
    try {
      setLoading(true);
      const data = await getCachedCentres();
      setCentres(data.data); // 'data' property based on our FastAPI response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Function to refresh cache (could be tied to a button)
  const handleRefresh = async () => {
    try {
      await refreshCentresCache();
      await loadCentres();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCentres();
  }, []);

  if (loading) return <div>Loading centres data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Earlyon Child and Family Centres</h1>
      <button onClick={handleRefresh}>Refresh Data</button>
      <pre>{JSON.stringify(centres, null, 2)}</pre>
    </div>
  );
};

export default CentreList;