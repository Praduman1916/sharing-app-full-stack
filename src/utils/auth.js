import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (!decoded || !decoded.role) {
      throw new Error('Invalid token or missing role');
    }
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
