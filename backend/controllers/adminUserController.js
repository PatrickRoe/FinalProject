// controllers/adminUserController.js
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Get All Users Error:', err.message);
    res.status(500).send('Server Error');
  }
};

export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Update User Role Error:', err.message);
    res.status(500).send('Server Error');
  }
};
