// pages/api/login.js
import clientPromise from '@/lib/mongodb';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda není povolena' });
  }

  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db('mydatabase'); // název databáze není třeba pokud je v URI

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('Request body:', req.body);
      return res.status(401).json({ message: 'Uživatel nenalezen' });
    }

    const isValid = await compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Neplatné heslo' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600, // 1 hodina
    }));

    return res.status(200).json({ message: 'Přihlášení úspěšné' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Chyba serveru' });
  }
}

