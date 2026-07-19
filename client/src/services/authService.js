import axios from "axios";
import socket from "./socket";

//base backend URL
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

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
    `${import.meta.env.VITE_API_URL}/users`,
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
    `${import.meta.env.VITE_API_URL}/messages/${userId}`,
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
    `${import.meta.env.VITE_API_URL}/messages`,
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