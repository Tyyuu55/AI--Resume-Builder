import axios from "axios";

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// Create an Axios instance with default config
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/", // ✅ No trailing slash
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// API functions
const createNewResume = (data) => axiosClient.post('/resumeofusers', data);

const GetUserResumes = (userEmail) => 
  axiosClient.get('/resumeofusers', {
    params: {
      'filters[userEmail][$eq]': userEmail
    }
  });

const UpdateResumeDetail = (id, data) => 
  axiosClient.put('/resumeofusers/' + id, data);

const DeleteResumeById = (id) => 
  axiosClient.delete('/resumeofusers/' + id);

const GetResumeById = (id) => 
  axiosClient.get('/resumeofusers/' + id, {
    params: {
      populate: '*'
    }
  });

// Export all as one object
export default {
  createNewResume,
  GetUserResumes,
  DeleteResumeById,
  GetResumeById,
  UpdateResumeDetail
};
