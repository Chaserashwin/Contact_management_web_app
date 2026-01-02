// API Base URL - works with Vite proxy in dev, full URL in production
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL || "https://your-backend-url.onrender.com"
    : "";

export default API_BASE_URL;
