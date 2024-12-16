import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Fetching user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/userlist');
        const data = await response.json();
        setUsers(data.userlist);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsers();
  }, []);

  const userColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,
      valueGetter: (params: GridCellParams) => {
        const roles = params.row ? params.row.roles || [] : [];
        return roles.map((role: { name: string }) => role.name).join(', ') || 'No roles';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: any) => (
        <>
          <Button onClick={() => handleEditUser(params.row)} color="primary" size="small">
            Edit
          </Button>
          <Button onClick={() => handleDeleteUser(params.row.id)} color="secondary" size="small">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEditUser = (user: any) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Delete user:', userId);
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
         <h3>Manage Users</h3>
      <DataGrid rows={users} columns={userColumns} pageSize={5} />
    </div>
  );
};

export default ManageUsers;
