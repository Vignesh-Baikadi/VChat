import axios from "axios";

//base backend URL
const API_URL = "http://localhost:5000/api/auth";

//Function that helps to send data to backend
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};