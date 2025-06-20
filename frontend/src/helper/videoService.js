// Base URL for API calls
const API_BASE_URL = "http://localhost:5000/api";

// Service functions for videos
export const videosService = {
  // Get all videos with optional filtering
  getAllVideos: async (filters = {}) => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      if (filters.category) queryParams.append("category", filters.category);
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.featured) queryParams.append("featured", filters.featured);
      if (filters.truckSlug) queryParams.append("truckSlug", filters.truckSlug);
      if (filters.limit) queryParams.append("limit", filters.limit);
      if (filters.page) queryParams.append("page", filters.page);

      const url = `${API_BASE_URL}/videos${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch videos");
      }

      return data.data; // Return the videos array from API response
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  // Get video by ID
  getVideoById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch video");
      }

      return data.data; // Return the video object from API response
    } catch (error) {
      console.error("Error fetching video:", error);
      throw error;
    }
  },

  // Get videos by truck slug
  getVideosByTruckSlug: async (truckSlug) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/videos/by-truck/${truckSlug}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch videos for truck");
      }

      return data.data; // Return the videos array from API response
    } catch (error) {
      console.error("Error fetching videos by truck slug:", error);
      throw error;
    }
  },

  // Get featured videos
  getFeaturedVideos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/featured`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch featured videos");
      }

      return data.data; // Return the videos array from API response
    } catch (error) {
      console.error("Error fetching featured videos:", error);
      throw error;
    }
  },

  // Get available video categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/categories`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      return data.data; // Return the categories array from API response
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get videos by category
  getVideosByCategory: async (category) => {
    try {
      return await videosService.getAllVideos({ category });
    } catch (error) {
      console.error("Error fetching videos by category:", error);
      throw error;
    }
  },

  // Create new video (for future admin use)
  createVideo: async (videoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create video");
      }

      return data.data; // Return the created video from API response
    } catch (error) {
      console.error("Error creating video:", error);
      throw error;
    }
  },

  // Update video (for future admin use)
  updateVideo: async (id, videoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update video");
      }

      return data.data; // Return the updated video from API response
    } catch (error) {
      console.error("Error updating video:", error);
      throw error;
    }
  },

  // Delete video (for future admin use)
  deleteVideo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete video");
      }

      return data; // Return success response
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  },
};
