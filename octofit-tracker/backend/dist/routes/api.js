"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.get('/users', async (_req, res, next) => {
    try {
        const users = await models_1.UserModel.find().populate('team', 'name').lean();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.apiRouter.get('/teams', async (_req, res, next) => {
    try {
        const teams = await models_1.TeamModel.find().populate('members', 'name email points').lean();
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
exports.apiRouter.get('/activities', async (_req, res, next) => {
    try {
        const activities = await models_1.ActivityModel.find().populate('user', 'name email').lean();
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
exports.apiRouter.get('/leaderboard', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardModel.find().populate('entries.user', 'name email').lean();
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
exports.apiRouter.get('/workouts', async (_req, res, next) => {
    try {
        const workouts = await models_1.WorkoutModel.find().populate('recommendedFor', 'name fitnessLevel').lean();
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
