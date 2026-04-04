import axios from "axios";

const axiosInstance = axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://subarno-server.onrender.com/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
