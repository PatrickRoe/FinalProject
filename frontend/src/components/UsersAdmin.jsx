// src/components/UsersAdmin.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, isAdmin) => {
    try {
      await axios.put(`/admin/users/${userId}/role`, { isAdmin });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.fullName}</td>
              <td className="px-4 py-2 border">{user.isAdmin ? 'Admin' : 'User'}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleRoleChange(user._id, !user.isAdmin)}
                  className={`px-4 py-2 rounded-md ${
                    user.isAdmin ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
                >
                  {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersAdmin;
