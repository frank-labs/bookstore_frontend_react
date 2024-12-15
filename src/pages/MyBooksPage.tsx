import React from 'react';
import { getMyBooks } from '../api/api';
import HomePage from './HomePage';

const MyBooksPage: React.FC = () => {
  const fetchMyBooks = async (page: number) => {
    const response = await getMyBooks(page);
    return response;
  };

  return <HomePage title="My Books" fetchData={fetchMyBooks} />;
};

export default MyBooksPage;
