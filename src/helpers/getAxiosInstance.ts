import axios, { AxiosInstance } from 'axios';

// Create a new instance of Axios

const baseURL = `${process.env.HB_FORM_API}/${process.env.HB_SUBSCRIPTION_ID}`;
const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: parseInt(`${process.env.AXIOS_TIMEOUT}`),
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers you need
  },
});

export default api;
