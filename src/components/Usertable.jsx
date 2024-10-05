import React, { useState } from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id);
    }
  };


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto border border-[#BBBBBB26] mt-10 ">
      <div className="border border-[#BBBBBB26] rounded-md flex items-center gap-x-2 ps-2 mb-4 m-4 w-full max-w-[500px]">
      <svg
        fill="#C4C4C4A8"
        height="20px"
        width="20px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488.4 488.4"
        aria-label="Search Icon"
      >
        <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
      </svg>
      <input
        type="search"
        className="border-0 bg-transparent py-2 px-2 w-full text-xs placeholder-gray-500 text-[#fff] focus:outline-none"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        aria-label="Search"
      />
    </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 p-5">No users found.</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="bg-[rgba(187,187,187,0.04)]">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">
                  <a href={`mailto:${user.email}`} className="bg-[rgba(0,91,248,0.08)] text-[#005BF8] p-1">
                    {user.email}
                  </a>
                </td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.username || "N/A"}</td>
                <td className="px-6 py-4">
                  {user.address ? `${user.address.street}, ${user.address.city}` : "N/A"}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-500 py-2 px-4 border-2 border-blue-500 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 py-2 px-4 border-2 border-red-500 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
