const Job = require('../models/Job');

exports.getAllJobs = async ({ search = '', type, location, page = 1, limit = 6 }) => {
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (type) query.type = type;
  if (location) query.location = location;

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(query),
  ]);

  return {
    jobs,
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
};


exports.getJobById = async (id) => {
  return await Job.findById(id);
};

exports.createJob = async (data) => {
  const job = new Job(data);
  return await job.save();
};
