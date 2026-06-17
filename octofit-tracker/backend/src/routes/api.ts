import { Router } from 'express';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models';

export const apiRouter = Router();

apiRouter.get('/users', async (_req, res, next) => {
  try {
    const users = await UserModel.find().populate('team', 'name').lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('members', 'name email points').lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().populate('user', 'name email').lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().populate('entries.user', 'name email').lean();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().populate('recommendedFor', 'name fitnessLevel').lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});
