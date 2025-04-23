// pages/api/set-token.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token required' });
    }

    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Secure flag for production
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
    }));

    return res.status(200).json({ message: 'Token set in cookie' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
