import React, { useEffect, useState } from 'react';
import UserTable from './components/Usertable';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (user, reset) => { 
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setSuccessMessage('User created successfully!');
      reset(); // Reset the form fields
    } catch (error) {
      setError('Error creating user');
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error updating user:', errorMessage);
        setError('Error updating user');
        return;
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
      setSuccessMessage('User updated successfully!');
    } catch (error) {
      setError('Error updating user');
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setSuccessMessage('User deleted successfully!');
      } catch (error) {
        setError('Error deleting user');
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = (data, reset) => { 
    if (editingUser) {
      updateUser({ ...data, id: editingUser.id });
    } else {
      createUser(data, reset); 
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="container mx-auto p-5 ">
      <h1 className="text-2xl font-bold mb-10 text-center">User Management</h1>
<div className='text-center pb-4'>
{loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
</div>
      <UserForm onSubmit={handleSubmit} editingUser={editingUser} />
      <UserTable users={users} onEdit={handleEdit} onDelete={deleteUser} />
    </div>
  );
};

export default App;


