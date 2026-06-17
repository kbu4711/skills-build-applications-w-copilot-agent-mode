import { Router } from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team.js';
const router = Router();
const isValidId = (id) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members', '-password');
        res.json(teams);
    }
    catch {
        res.status(500).json({ message: 'Failed to fetch teams' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, description, members } = req.body;
        if (!name) {
            res.status(400).json({ message: 'name is required' });
            return;
        }
        const team = new Team({ name, description, members });
        await team.save();
        res.status(201).json(team);
    }
    catch {
        res.status(500).json({ message: 'Failed to create team' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const team = await Team.findById(req.params['id']).populate('members', '-password');
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch {
        res.status(500).json({ message: 'Failed to fetch team' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const team = await Team.findByIdAndUpdate(req.params['id'], { $set: req.body }, { new: true }).populate('members', '-password');
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch {
        res.status(500).json({ message: 'Failed to update team' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        if (!isValidId(req.params['id'])) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const team = await Team.findByIdAndDelete(req.params['id']);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted' });
    }
    catch {
        res.status(500).json({ message: 'Failed to delete team' });
    }
});
export default router;
