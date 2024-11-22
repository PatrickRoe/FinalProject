// src/pages/Profile.jsx

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    // Add other fields if needed
  });

  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error (e.g., redirect to login if unauthorized)
        if (error.response.status === 401) {
          logout();
        }
      }
    };

    fetchProfile();
  }, [logout]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put('/auth/profile', profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 font-serif">Your Profile</h1>
      <div className="bg-white dark:bg-dark-gray p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-700"
            />
          ) : (
            <p>{profile.fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-700"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>
        {/* Add other profile fields as needed */}
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-black text-white px-6 py-3 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-6 py-3 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-black text-white px-6 py-3 rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
        {/* Link to Order History */}
        <div className="mt-8">
          <Link to="/orders" className="bg-black text-white px-6 py-3 rounded-md">
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
