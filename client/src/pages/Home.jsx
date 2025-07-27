import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (pageNum = 1, searchText = '', selectedType = '') => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5001/api/jobs?page=${pageNum}&limit=6&search=${searchText}&type=${selectedType}`
      );
      const data = await res.json();

      if (pageNum === 1) {
        setJobs(data.jobs);
      } else {
        setJobs((prev) => [...prev, ...data.jobs]);
      }

      setHasMore(pageNum < data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Error loading jobs', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchJobs(1, search, jobType);
  }, [search, jobType]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage, search, jobType);
  };

  return (
    <div className="bg-light min-vh-100">
      <header className="bg-primary text-white text-center py-5 mb-4 shadow">
        <h1 className="display-4">Find Your Dream Job</h1>
        <p className="lead">Browse thousands of job openings tailored to your skills</p>
        <Link to="/add-job" className="btn btn-light mt-3 px-4">
          + Post a Job
        </Link>
      </header>

      {/* Filter Bar */}
      <div className="container mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs */}
      <div className="container">
        {loading && page === 1 ? (
          <p className="text-center">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted">No jobs found.</p>
        ) : (
          <div className="row g-4 pb-4">
            {jobs.map((job) => (
              <div key={job._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="card-title mb-1">{job.title}</h5>
                        <p className="text-muted mb-0">{job.company}</p>
                      </div>
                      <span className="badge bg-info text-dark text-uppercase">{job.type}</span>
                    </div>
                    <p className="card-text text-muted small mt-2">
                      {job.description?.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 text-end mb-2">
                    <Link to={`/job/${job._id}`} className="btn btn-outline-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center pb-4">
            <button className="btn btn-outline-primary" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}

        {loading && page > 1 && (
          <div className="text-center mt-3 text-secondary">Loading more jobs...</div>
        )}
      </div>
    </div>
  );
}

export default Home;

