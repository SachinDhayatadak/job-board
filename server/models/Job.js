const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
    required: [true, 'Job type is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    minlength: [10, 'Description must be at least 10 characters'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
