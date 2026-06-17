import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

const router = Router();

const isValidId = (id: string | string[]) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user', '-password');
    res.json(activities);
  } catch {
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, activityType, duration, date } = req.body as { user: string; activityType: string; duration: number; date?: Date };
    if (!user || !activityType || duration === undefined) {
      res.status(400).json({ message: 'user, activityType, and duration are required' });
      return;
    }
    const activity = new Activity({ user, activityType, duration, date });
    await activity.save();
    res.status(201).json(activity);
  } catch {
    res.status(500).json({ message: 'Failed to create activity' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const activity = await Activity.findById(req.params['id']).populate('user', '-password');
    if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
    res.json(activity);
  } catch {
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const activity = await Activity.findByIdAndUpdate(req.params['id'], { $set: req.body }, { new: true }).populate('user', '-password');
    if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
    res.json(activity);
  } catch {
    res.status(500).json({ message: 'Failed to update activity' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!isValidId(req.params['id'])) { res.status(400).json({ message: 'Invalid id' }); return; }
    const activity = await Activity.findByIdAndDelete(req.params['id']);
    if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
    res.json({ message: 'Activity deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete activity' });
  }
});

export default router;
