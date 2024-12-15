import axios from 'axios';

// Set up a base Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, // Ensures cookies are sent with each request
});

// Function to place an order
export const buyBook = async (userid: number, bookid: number) => {
    try {
        const response = await api.post('/buybook', {
            userid,
            bookid,
        });
        return response;
    } catch (err) {
        throw err;
    }
};
// Function to fetch books with pagination
export const getBooks = async (page: number) => {
  try {
      const response = await api.get(`/books?page=${page}`);
      return response.data; // Assuming the API response contains { books, totalPages, currentPage }
  } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
  }
};
export default api;
