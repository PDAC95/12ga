// Base URL for API calls
const API_BASE_URL = "http://localhost:5000/api";

// Service functions
export const trucksService = {
  // Get all trucks
  getAllTrucks: async () => {
    try {
      // Add limit parameter to get all trucks (or a higher number)
      const response = await fetch(`${API_BASE_URL}/trucks?limit=200`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch trucks");
      }

      return data.data; // Return the trucks array from API response
    } catch (error) {
      console.error("Error fetching trucks:", error);
      throw error;
    }
  },

  // Get truck by ID
  getTruckById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/trucks/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch truck");
      }

      return data.data; // Return the truck object from API response
    } catch (error) {
      console.error("Error fetching truck:", error);
      throw error;
    }
  },

  // Get truck by slug
  getTruckBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/trucks/slug/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch truck");
      }

      return data.data; // Return the truck object from API response
    } catch (error) {
      console.error("Error fetching truck by slug:", error);
      throw error;
    }
  },

  // Get filtered trucks
  getFilteredTrucks: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.make) queryParams.append("make", filters.make);
      if (filters.year) queryParams.append("year", filters.year);
      if (filters.name) queryParams.append("search", filters.name);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.status) queryParams.append("status", filters.status);

      queryParams.append("limit", "200");

      const url = `${API_BASE_URL}/trucks${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch filtered trucks");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching filtered trucks:", error);
      throw error;
    }
  },
};
