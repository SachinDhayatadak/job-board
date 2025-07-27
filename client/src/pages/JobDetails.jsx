import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5 text-primary">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-5 text-danger">Job not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Job Details</h2>
        <Link to="/" className="btn btn-outline-secondary">← Back to Home</Link>
      </div>

      <div className="card shadow border-0">
        <div className="card-body">
          <h3 className="card-title mb-3">{job.title}</h3>
          <p className="mb-2"><strong>Company:</strong> {job.company}</p>
          <p className="mb-2"><strong>Type:</strong> {job.type}</p>
          <p className="mb-2"><strong>Location:</strong> {job.location}</p>
          <hr />
          <p style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
          <hr />
          <p className="text-muted">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
