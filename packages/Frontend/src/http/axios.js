import axios from 'axios';
import { apiBaseUrl } from '../utils/Constants';
import toast from "react-hot-toast";

const callAPI = async (method, url, data = {}, headers = {}) => {
  try {
    const options = {
      method,
      url: `${apiBaseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers
      },
      withCredentials: true, // Include credentials for session-based auth
    };

    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      options.data = data;
    }

    const response = await axios(options);

    // Show success message if it exists
    if (response?.data?.message) {
      toast.success(response.data.message);
    }

    return response.data;

  } catch (error) {
    // Improved error handling to show server-provided error message, if available
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(errorMessage);
    throw error; // Rethrow the error for further handling if needed
  }
};

export default callAPI;