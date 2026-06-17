import { Router } from 'express';
import mongoose from 'mongoose';
import Leaderboard from '../models/Leaderboard.js';
const router = Router();
const isValidId = (id) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);
router.get('/', async (_req, res) => {
    try {
        const entries = await Leaderboard.find().populate('user', '-password').sort({ score: -1 });
        res.json(entries);
    }
    catch {
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { user, score } = req.body;
        if (!user) {
            res.status(400).json({ message: 'user is required' });
            return;
        }
        const entry = new Leaderboard({ user, score });
        await entry.save();
        res.status(201).json(entry);
    }
    catch {
        res.status(500).json({ message: 'Failed to create leaderboard entry' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const entry = await Leaderboard.findById(req.params['id']).populate('user', '-password');
        if (!entry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch {
        res.status(500).json({ message: 'Failed to fetch leaderboard entry' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const entry = await Leaderboard.findByIdAndUpdate(req.params['id'], { $set: req.body }, { new: true }).populate('user', '-password');
        if (!entry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch {
        res.status(500).json({ message: 'Failed to update leaderboard entry' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const entry = await Leaderboard.findByIdAndDelete(req.params['id']);
        if (!entry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json({ message: 'Leaderboard entry deleted' });
    }
    catch {
        res.status(500).json({ message: 'Failed to delete leaderboard entry' });
    }
});
export default router;
