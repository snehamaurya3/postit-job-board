import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import EditJobPage from './pages/EditJobPage'
import HomePage from './pages/HomePage'
import JobDetailsPage from './pages/JobDetailsPage'
import LoginPage from './pages/LoginPage'
import CreateJobPage from './pages/CreateJobPage'
import RegisterPage from './pages/RegisterPage'
import JobsPage from './pages/JobsPage'
import RecruiterDashboard from './pages/RecruiterDashboard'

import ApplicantDashboard from './pages/ApplicantDashboard'

import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute role="recruiter">
      <EditJobPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/register"
  element={<RegisterPage />}
/>

        <Route
          path="/login"
          element={<LoginPage />}
        />
<Route
  path="/create-job"
  element={
    <ProtectedRoute role="recruiter">
      <CreateJobPage />
    </ProtectedRoute>
  }
/>
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobs/:id"
  element={<JobDetailsPage />}
/>
          <Route
  path="/jobs"
  element={<JobsPage />}
/>
        <Route
          path="/applicant"
          element={
            <ProtectedRoute role="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App