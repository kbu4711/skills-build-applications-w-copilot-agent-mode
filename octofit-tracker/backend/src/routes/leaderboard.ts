import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('user', 'username email');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('user', 'username email');
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
