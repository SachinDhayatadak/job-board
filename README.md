# Job Board

A modern full-stack job listing application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to post, browse, and view job opportunities with a clean and responsive interface.

## ⚙️ Setup Instructions

1. **Clone the repository, install dependencies, create environment file, and run the application:**

```bash
# Clone the repository
git clone https://github.com/your-username/job-board.git
cd job-board

# Install dependencies
cd client && npm install
cd ../server && npm install

# Create .env file in the server folder
echo "PORT=5000\nMONGODB_URI=your_mongodb_connection_string" > .env
