import axios from 'axios';

const API_KEY = '51479963-53d51370f5836e8ee394a60fa'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; 
  } catch (error) {
    console.error('Error while retrieving images:', error);
    throw new Error('Failed to retrieve images. Please try again.');
  }
}