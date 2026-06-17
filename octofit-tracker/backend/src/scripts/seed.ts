/**
 * Seed the octofit_db database with test data
 *
 * This script populates the octofit_db MongoDB database with realistic
 * sample data for users, teams, activities, leaderboard, and workouts.
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB (octofit_db)');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // Seed users
  const users = await User.insertMany([
    {
      username: 'thunderpaws',
      email: 'thunderpaws@mergington.edu',
      age: 17,
      weight: 68,
      height: 175,
      fitness_goal: 'Build endurance for cross-country running',
    },
    {
      username: 'octorunner',
      email: 'octorunner@mergington.edu',
      age: 16,
      weight: 62,
      height: 168,
      fitness_goal: 'Improve sprint speed and agility',
    },
    {
      username: 'codefitness',
      email: 'codefitness@mergington.edu',
      age: 18,
      weight: 75,
      height: 182,
      fitness_goal: 'Gain muscle mass and strength',
    },
    {
      username: 'trackhero',
      email: 'trackhero@mergington.edu',
      age: 16,
      weight: 58,
      height: 165,
      fitness_goal: 'Lose weight and improve cardiovascular health',
    },
    {
      username: 'gymoctopus',
      email: 'gymoctopus@mergington.edu',
      age: 17,
      weight: 70,
      height: 178,
      fitness_goal: 'Overall fitness and flexibility',
    },
  ]);
  console.log(`Seeded ${users.length} users`);

  // Seed teams
  const teams = await Team.insertMany([
    {
      name: 'Mergington Runners',
      description: 'Track and field enthusiasts focused on long-distance running',
      members: [users[0]._id, users[1]._id, users[3]._id],
    },
    {
      name: 'Iron Octofit',
      description: 'Strength training team dedicated to weightlifting and powerlifting',
      members: [users[2]._id, users[4]._id],
    },
  ]);
  console.log(`Seeded ${teams.length} teams`);

  // Seed activities
  const activities = await Activity.insertMany([
    {
      user: users[0]._id,
      activity_type: 'running',
      duration: 45,
      calories_burned: 420,
      date: new Date('2024-06-01'),
      notes: 'Morning run around the school track',
    },
    {
      user: users[1]._id,
      activity_type: 'cycling',
      duration: 60,
      calories_burned: 500,
      date: new Date('2024-06-02'),
      notes: 'Evening bike ride through the park',
    },
    {
      user: users[2]._id,
      activity_type: 'strength training',
      duration: 50,
      calories_burned: 350,
      date: new Date('2024-06-01'),
      notes: 'Bench press and squats session',
    },
    {
      user: users[3]._id,
      activity_type: 'walking',
      duration: 30,
      calories_burned: 150,
      date: new Date('2024-06-03'),
      notes: 'Lunchtime walk',
    },
    {
      user: users[4]._id,
      activity_type: 'yoga',
      duration: 40,
      calories_burned: 180,
      date: new Date('2024-06-02'),
      notes: 'Morning yoga for flexibility',
    },
    {
      user: users[0]._id,
      activity_type: 'running',
      duration: 35,
      calories_burned: 320,
      date: new Date('2024-06-04'),
      notes: 'Speed intervals on the track',
    },
    {
      user: users[2]._id,
      activity_type: 'strength training',
      duration: 55,
      calories_burned: 400,
      date: new Date('2024-06-04'),
      notes: 'Deadlifts and overhead press',
    },
  ]);
  console.log(`Seeded ${activities.length} activities`);

  // Seed leaderboard
  const leaderboard = await Leaderboard.insertMany([
    {
      user: users[0]._id,
      score: 740,
      rank: 1,
      total_activities: 2,
      total_calories_burned: 740,
    },
    {
      user: users[2]._id,
      score: 750,
      rank: 2,
      total_activities: 2,
      total_calories_burned: 750,
    },
    {
      user: users[1]._id,
      score: 500,
      rank: 3,
      total_activities: 1,
      total_calories_burned: 500,
    },
    {
      user: users[4]._id,
      score: 180,
      rank: 4,
      total_activities: 1,
      total_calories_burned: 180,
    },
    {
      user: users[3]._id,
      score: 150,
      rank: 5,
      total_activities: 1,
      total_calories_burned: 150,
    },
  ]);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);

  // Seed workouts
  const workouts = await Workout.insertMany([
    {
      name: '5K Training Plan',
      description: 'A beginner-friendly plan to complete your first 5K race',
      difficulty: 'beginner',
      duration: 30,
      exercises: ['Warm-up walk 5 min', 'Run 1 min / Walk 2 min x 8', 'Cool-down walk 5 min'],
    },
    {
      name: 'Full Body Strength',
      description: 'Comprehensive full body strength workout using compound movements',
      difficulty: 'intermediate',
      duration: 60,
      exercises: ['Squats 3x10', 'Bench Press 3x10', 'Deadlift 3x8', 'Pull-ups 3x8', 'Overhead Press 3x10'],
    },
    {
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training to maximize calorie burn',
      difficulty: 'advanced',
      duration: 25,
      exercises: [
        'Burpees 30 sec',
        'Mountain Climbers 30 sec',
        'Jump Squats 30 sec',
        'High Knees 30 sec',
        'Rest 30 sec',
        'Repeat x 5',
      ],
    },
    {
      name: 'Morning Yoga Flow',
      description: 'Gentle yoga sequence to start your day with energy and flexibility',
      difficulty: 'beginner',
      duration: 20,
      exercises: [
        "Child's Pose 1 min",
        'Cat-Cow 1 min',
        'Downward Dog 1 min',
        'Warrior I 1 min each side',
        'Warrior II 1 min each side',
        'Savasana 2 min',
      ],
    },
    {
      name: 'Sprint Interval Training',
      description: 'Track-focused sprint sessions to improve speed and anaerobic capacity',
      difficulty: 'advanced',
      duration: 45,
      exercises: [
        'Dynamic warm-up 10 min',
        '100m sprint x 8 with 90 sec rest',
        '200m sprint x 4 with 2 min rest',
        'Cool-down jog 10 min',
      ],
    },
  ]);
  console.log(`Seeded ${workouts.length} workouts`);

  console.log('Database seeding completed successfully!');
  await mongoose.connection.close();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
