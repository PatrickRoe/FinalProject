import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Include credentials (cookies)
});

// Request interceptor to add the tokens to headers
instance.interceptors.request.use(
  async (config) => {
    // Fetch CSRF token for each request to handle token rotation
    const response = await axios.get("/csrf-token", {
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
    const csrfToken = response.data.csrfToken;
    config.headers["X-CSRF-Token"] = csrfToken;

    // Get access token from local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh (no changes needed here)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Your existing error handling code
    // ...
    return Promise.reject(error);
  }
);

export default instance;
