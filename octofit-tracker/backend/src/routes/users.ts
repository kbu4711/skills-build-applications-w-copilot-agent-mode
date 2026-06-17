import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = Router();

const isValidId = (id: string | string[]) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as { username: string; email: string; password: string };
    if (!username || !email || !password) {
      res.status(400).json({ message: 'username, email, and password are required' });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.status(201).json({ _id: user._id, username: user.username, email: user.email });
  } catch {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const user = await User.findById(req.params['id']).select('-password');
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const { password, ...safeFields } = req.body as Record<string, unknown>;
    if (password && typeof password === 'string') {
      (safeFields as Record<string, unknown>)['password'] = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params['id'], { $set: safeFields }, { new: true }).select('-password');
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to update user' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const user = await User.findByIdAndDelete(req.params['id']);
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
