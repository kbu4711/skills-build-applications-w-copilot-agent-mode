"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
const seed = async () => {
    // Seed the octofit_db database with test data
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
        models_1.UserModel.deleteMany({}),
        models_1.TeamModel.deleteMany({})
    ]);
    const teams = await models_1.TeamModel.insertMany([
        { name: 'Cardio Cats', school: 'Mergington High School' },
        { name: 'Power Penguins', school: 'Mergington High School' }
    ]);
    const users = await models_1.UserModel.insertMany([
        {
            name: 'Avery Nguyen',
            email: 'avery.nguyen@mergington.edu',
            age: 16,
            fitnessLevel: 'intermediate',
            team: teams[0]._id,
            points: 410
        },
        {
            name: 'Jordan Patel',
            email: 'jordan.patel@mergington.edu',
            age: 17,
            fitnessLevel: 'advanced',
            team: teams[1]._id,
            points: 525
        },
        {
            name: 'Riley Morgan',
            email: 'riley.morgan@mergington.edu',
            age: 15,
            fitnessLevel: 'beginner',
            team: teams[0]._id,
            points: 290
        }
    ]);
    teams[0].members = [users[0]._id, users[2]._id];
    teams[0].totalPoints = users[0].points + users[2].points;
    teams[1].members = [users[1]._id];
    teams[1].totalPoints = users[1].points;
    await Promise.all([teams[0].save(), teams[1].save()]);
    await models_1.ActivityModel.insertMany([
        {
            user: users[0]._id,
            type: 'running',
            durationMinutes: 35,
            caloriesBurned: 320,
            pointsEarned: 85,
            date: new Date('2026-06-14T07:15:00.000Z')
        },
        {
            user: users[1]._id,
            type: 'strength',
            durationMinutes: 50,
            caloriesBurned: 390,
            pointsEarned: 110,
            date: new Date('2026-06-15T15:30:00.000Z')
        },
        {
            user: users[2]._id,
            type: 'walking',
            durationMinutes: 45,
            caloriesBurned: 180,
            pointsEarned: 60,
            date: new Date('2026-06-16T06:40:00.000Z')
        }
    ]);
    await models_1.WorkoutModel.insertMany([
        {
            title: 'Morning Endurance Run',
            category: 'cardio',
            difficulty: 'intermediate',
            durationMinutes: 30,
            targetMuscles: ['legs', 'core'],
            description: 'Steady-state run with progressive pace increase in the final 10 minutes.',
            recommendedFor: [users[0]._id]
        },
        {
            title: 'After-School Strength Circuit',
            category: 'strength',
            difficulty: 'advanced',
            durationMinutes: 40,
            targetMuscles: ['full body'],
            description: 'Compound lift and bodyweight circuit to build strength and power.',
            recommendedFor: [users[1]._id]
        },
        {
            title: 'Beginner Mobility Flow',
            category: 'mobility',
            difficulty: 'beginner',
            durationMinutes: 20,
            targetMuscles: ['hips', 'hamstrings', 'shoulders'],
            description: 'Low-impact flexibility and mobility routine for recovery days.',
            recommendedFor: [users[2]._id]
        }
    ]);
    await models_1.LeaderboardModel.create({
        period: 'weekly',
        generatedAt: new Date('2026-06-17T08:00:00.000Z'),
        entries: [
            { user: users[1]._id, points: users[1].points, rank: 1 },
            { user: users[0]._id, points: users[0].points, rank: 2 },
            { user: users[2]._id, points: users[2].points, rank: 3 }
        ]
    });
    console.log('Seeding complete.');
};
seed()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
