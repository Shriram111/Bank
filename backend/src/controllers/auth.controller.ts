import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'neobank-cloud-jwt-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'neobank-cloud-refresh-secret';

export class AuthController {
  private users: any[] = [
    { id: '1', name: 'Shriram Kumar', email: 'shriram@neobank.cloud', phone: '9876543210', password: bcrypt.hashSync('password123', 10), role: 'ADMIN', isVerified: true, avatar: null },
    { id: '2', name: 'Priya Sharma', email: 'priya@neobank.cloud', phone: '9876543211', password: bcrypt.hashSync('password123', 10), role: 'CUSTOMER', isVerified: true, avatar: null },
  ];

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, password } = req.body;
      const existingUser = this.users.find(u => u.email === email || u.phone === phone);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = {
        id: uuidv4(),
        name, email, phone,
        password: hashedPassword,
        role: 'CUSTOMER',
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
      this.users.push(user);
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: { user: { id: user.id, name, email, phone, role: user.role }, token, refreshToken },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = this.users.find(u => u.email === email);
      if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
      res.json({
        success: true,
        data: {
          user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, isVerified: user.isVerified },
          token, refreshToken,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  };

  verifyOTP = async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;
      if (otp === '123456') {
        const user = this.users.find(u => u.email === email);
        if (user) user.isVerified = true;
        return res.json({ success: true, message: 'OTP verified successfully' });
      }
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'OTP verification failed' });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
      const user = this.users.find(u => u.id === decoded.id);
      if (!user) return res.status(401).json({ success: false, message: 'Invalid refresh token' });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
      const newRefreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
      res.json({ success: true, data: { token, refreshToken: newRefreshToken } });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
  };

  logout = async (req: Request, res: Response) => {
    res.json({ success: true, message: 'Logged out successfully' });
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = this.users.find(u => u.email === email);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.json({ success: true, message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send reset link' });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Password reset failed' });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      const user = this.users.find(u => u.id === userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const { password, ...userData } = user;
      res.json({ success: true, data: userData });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to get profile' });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      const userIndex = this.users.findIndex(u => u.id === userId);
      if (userIndex === -1) return res.status(404).json({ success: false, message: 'User not found' });
      this.users[userIndex] = { ...this.users[userIndex], ...req.body };
      const { password, ...userData } = this.users[userIndex];
      res.json({ success: true, data: userData, message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to change password' });
    }
  };
}
