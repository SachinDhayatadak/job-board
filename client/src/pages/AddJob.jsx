import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function AddJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Full-time',
    location: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const { title, company, type, location, description } = formData;
    if (!title.trim()) return 'Job title is required.';
    if (!company.trim()) return 'Company name is required.';
    if (!location.trim()) return 'Location is required.';
    if (!type) return 'Job type is required.';
    if (!description.trim() || description.length < 10)
      return 'Description must be at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Job added successfully!');
        navigate('/');
      } else {
        const err = await response.json();
        toast.error(`Error: ${err.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server.');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Add New Job</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>

      <div className="card shadow border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">Job Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="company" className="form-label">Company Name</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="type" className="form-label">Job Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label">Job Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <div className="form-text">Minimum 10 characters.</div>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-4">Submit Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
