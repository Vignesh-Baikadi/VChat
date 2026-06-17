import axios from "axios";
import socket from "./socket";

//base backend URL
const API_URL = "http://localhost:5000/api/auth";

//Function that helps to send data to backend to register
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

//Function that helps to send data to backend for login
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};

//Get users form the backend 
export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get conversation messages
export const getMessages = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/messages/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Send a message
export const sendMessage = async (
  receiverId,
  content
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/messages",
    {
      receiverId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

//Logs out the user
export const logoutUser = () => {
  socket.disconnect();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};