import { useState, useEffect } from "react";
import { trucksService } from "./trucksService";

// Custom hook for managing trucks data
export const useTrucks = (filters = {}) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if filters are provided and have values
        const hasFilters = Object.keys(filters).some(
          (key) => filters[key] && filters[key].trim() !== ""
        );

        let trucksData;
        if (hasFilters) {
          trucksData = await trucksService.getFilteredTrucks(filters);
        } else {
          trucksData = await trucksService.getAllTrucks();
        }

        setTrucks(trucksData);
      } catch (err) {
        console.error("Error in useTrucks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, [JSON.stringify(filters)]); // Dependency on filters

  // Function to refetch data manually
  const refetch = async () => {
    const hasFilters = Object.keys(filters).some((key) => filters[key]);

    try {
      setLoading(true);
      setError(null);

      let trucksData;
      if (hasFilters) {
        trucksData = await trucksService.getFilteredTrucks(filters);
      } else {
        trucksData = await trucksService.getAllTrucks();
      }

      setTrucks(trucksData);
    } catch (err) {
      setError(err.message);
      console.error("Error in refetch:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trucks,
    loading,
    error,
    refetch,
  };
};

// Custom hook for getting a single truck by ID
export const useTruck = (id) => {
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTruck = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const truckData = await trucksService.getTruckById(id);
        setTruck(truckData);
      } catch (err) {
        setError(err.message);
        console.error("Error in useTruck:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTruck();
  }, [id]);

  // Function to refetch truck data manually
  const refetch = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const truckData = await trucksService.getTruckById(id);
      setTruck(truckData);
    } catch (err) {
      setError(err.message);
      console.error("Error in refetch:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    truck,
    loading,
    error,
    refetch,
  };
};

// Custom hook for getting a single truck by slug
export const useTruckBySlug = (slug) => {
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTruck = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const truckData = await trucksService.getTruckBySlug(slug);
        setTruck(truckData);
      } catch (err) {
        setError(err.message);
        console.error("Error in useTruckBySlug:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTruck();
  }, [slug]);

  return {
    truck,
    loading,
    error,
  };
};
