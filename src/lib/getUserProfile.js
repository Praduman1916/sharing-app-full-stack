import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const getUserProfileFromCookies = () => {
  try {
    const token = Cookies.get('token');
    if (!token) throw new Error('Token not found');
    const decoded = jwt.decode(token);

    return {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
      mobile: decoded.mobile,
      email: decoded.email
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
