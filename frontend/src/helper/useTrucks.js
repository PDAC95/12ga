import { useState, useEffect } from "react";
import { trucksService } from "./trucksService";

/**
 * Custom hook for managing trucks data with pagination reset functionality
 * @param {Object} filters - Filter parameters for trucks query
 * @returns {Object} Trucks data, loading state, error state, refetch function, and resetPage flag
 */
export const useTrucks = (filters = {}) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetPage, setResetPage] = useState(false);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        setLoading(true);
        setError(null);
        setResetPage(true);

        const hasFilters = Object.keys(filters).some(
          (key) => filters[key] && filters[key].toString().trim() !== ""
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
        setTimeout(() => setResetPage(false), 100);
      }
    };

    fetchTrucks();
  }, [JSON.stringify(filters)]);

  /**
   * Function to manually refetch trucks data
   */
  const refetch = async () => {
    const hasFilters = Object.keys(filters).some(
      (key) => filters[key] && filters[key].toString().trim() !== ""
    );

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
    resetPage,
  };
};

/**
 * Custom hook for getting a single truck by ID
 * @param {string} id - Truck ID
 * @returns {Object} Truck data, loading state, error state, and refetch function
 */
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

  /**
   * Function to manually refetch truck data
   */
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

/**
 * Custom hook for getting a single truck by slug
 * @param {string} slug - Truck slug
 * @returns {Object} Truck data, loading state, and error state
 */
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
