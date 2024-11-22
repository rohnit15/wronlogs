import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust the URL as needed

const getToken = () => {
  return localStorage.getItem('userToken');
};

export const createPost = async (postData: any) => {
  try {
    const token = getToken();
    console.log("token =>", token);
    if (!token) throw new Error('No token found');

    const response = await axios.post(`${API_URL}/posts`, postData, {
      headers: {
        usertoken: token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const token = getToken();
    console.log("token =>", token);
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${API_URL}/posts`, {
      headers: {
        usertoken: token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
