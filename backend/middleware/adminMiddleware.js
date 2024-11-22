// middleware/adminMiddleware.js

import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export default adminMiddleware;
