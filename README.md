# 📝 User Feedback System

A full-stack application that allows users to submit feedback and displays collected feedback in a dashboard with filtering and sorting options.

---

## 🚀 Features

- Submit user feedback through a simple form
- Store feedback in a MongoDB database
- Display feedback in a responsive dashboard
- Filter feedback by category (Suggestion, Bug, Feature, Other)
- Sort feedback by timestamp
- Containerized with Docker for easy deployment

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose

---

## 🔧 Installation and Setup

### ✅ Option 1: Running Locally

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-feedback-system
```
---
#### 2. Backend Setup
```bash
cd backend
npm install
```
##### - Create a .env file inside the backend/ directory
```bash
PORT=5000
MONGO_URI=
```
##### - Start the backend server
```bash
npm run dev
```
---

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

##### - Create a .env file inside the frontend/ directory:
```bash
REACT_APP_API_URL=
PORT=3000
```

##### - Start the frontend app
```bash
npm start
```
---
### 🐳 Option 2: Running with Docker

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd user-feedback-system
```
---
#### 2. Create .env Files
##### - In the backend/ directory:
```bash
PORT=5000
MONGO_URI=
```

##### - In the frontend/ directory:
```bash
REACT_APP_API_URL=
PORT=3000
```
---
#### 3. Start the App with Docker
```bash
docker-compose up -d
```