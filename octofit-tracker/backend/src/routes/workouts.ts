import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Workout from '../models/Workout.js';

const router = Router();

const isValidId = (id: string | string[]) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, exercises, difficulty } = req.body as { name: string; description?: string; exercises?: string[]; difficulty?: string };
    if (!name) { res.status(400).json({ message: 'name is required' }); return; }
    const workout = new Workout({ name, description, exercises, difficulty });
    await workout.save();
    res.status(201).json(workout);
  } catch {
    res.status(500).json({ message: 'Failed to create workout' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const workout = await Workout.findById(req.params['id']);
    if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
    res.json(workout);
  } catch {
    res.status(500).json({ message: 'Failed to fetch workout' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const workout = await Workout.findByIdAndUpdate(req.params['id'], { $set: req.body }, { new: true });
    if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
    res.json(workout);
  } catch {
    res.status(500).json({ message: 'Failed to update workout' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const workout = await Workout.findByIdAndDelete(req.params['id']);
    if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
    res.json({ message: 'Workout deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete workout' });
  }
});

export default router;
