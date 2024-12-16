import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const ManageBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  // Fetching book data
  useEffect(() => {
    const getBooks = async (page: number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/books?size=100&page=${page}`);
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    getBooks(0); // Fetch books for the first page
  }, []);

  const bookColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'author', headerName: 'Author', width: 180 },
    { field: 'genre', headerName: 'Genre', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: any) => (
        <>
          <Button onClick={() => handleEditBook(params.row)} color="primary" size="small">
            Edit
          </Button>
          <Button onClick={() => handleDeleteBook(params.row.id)} color="secondary" size="small">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEditBook = (book: any) => {
    console.log('Edit book:', book);
  };

  const handleDeleteBook = (bookId: number) => {
    console.log('Delete book:', bookId);
  };

  return (
    <div style={{height:600 , width: '100%' }}>
         <h3>Manage Books</h3>
      <DataGrid rows={books} columns={bookColumns} pageSize={5} />
    </div>
  );
};

export default ManageBooks;
