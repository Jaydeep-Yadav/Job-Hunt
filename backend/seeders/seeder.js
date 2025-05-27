import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

import User from '../models/user.model.js';
import Company from '../models/company.model.js';
import Job from '../models/job.model.js';
import Application from '../models/application.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🟢 MongoDB connected');

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({})
    ]);

    console.log('🧹 Old data wiped');

    // Create Users
    const password = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        fullname: 'Alice',
        email: 'alice@gmail.com',
        phoneNumber: 1234567890,
        password,
        role: 'jobseeker',
        profile: {
          bio: faker.lorem.sentence(),
          skills: ['JavaScript', 'React'],
          resume: 'https://example.com/resume.pdf',
          resumeOriginalName: 'resume.pdf',
          profilePhoto: faker.image.avatar()
        }
      },
      {
        fullname: 'Bob Recruiter',
        email: 'bob@company.com',
        phoneNumber: 9876543210,
        password,
        role: 'recruiter',
        profile: {
          company: null, // will update later
          profilePhoto: faker.image.avatar()
        }
      }
    ]);

    console.log('👤 Users created');

    // Create Company (linked to Bob Recruiter)
    const company = await Company.create({
      name: 'OpenAI Ltd.',
      description: faker.company.catchPhrase(),
      website: 'https://openai.com',
      location: 'San Francisco, CA',
      logo: faker.image.avatar(),
      userId: users[1]._id
    });

    // Update Bob's profile with company
    await User.findByIdAndUpdate(users[1]._id, {
      'profile.company': company._id
    });

    console.log('🏢 Company created and recruiter updated');

    // Create Jobs
    const jobs = await Job.insertMany([
      {
        title: 'Frontend Developer',
        description: faker.lorem.paragraph(),
        requirements: ['HTML', 'CSS', 'React'],
        salary: 70000,
        experienceLevel: 2,
        location: 'Remote',
        jobType: 'full-time',
        position: 1,
        company: company._id,
        created_by: users[1]._id
      },
      {
        title: 'Backend Engineer',
        description: faker.lorem.paragraph(),
        requirements: ['Node.js', 'MongoDB', 'Express'],
        salary: 80000,
        experienceLevel: 3,
        location: 'New York, NY',
        jobType: 'contract',
        position: 2,
        company: company._id,
        created_by: users[1]._id
      }
    ]);

    console.log('💼 Jobs created');

    // Create Applications
    await Application.insertMany([
      {
        job: jobs[0]._id,
        applicant: users[0]._id,
        status: 'pending'
      },
      {
        job: jobs[1]._id,
        applicant: users[0]._id,
        status: 'pending'
      }
    ]);

    console.log('📨 Applications created');

    console.log('🌱 Seeding complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeder Error:', err);
    process.exit(1);
  }
};

seed();
