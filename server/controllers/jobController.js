const jobService = require('../services/jobService');

exports.getJobs = async (req, res, next) => {
  try {
    const { search, type, location, page = 1, limit = 6 } = req.query;

    const result = await jobService.getAllJobs({
      search,
      type,
      location,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};


exports.getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const newJob = await jobService.createJob(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    next(err);
  }
};
