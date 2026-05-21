import {
  Navigate,
} from 'react-router-dom'

type Props = {
  children: React.ReactNode
  role?: 'recruiter' | 'applicant'
}

function ProtectedRoute({
  children,
  role,
}: Props) {
  const token =
    localStorage.getItem('token')

  const user = JSON.parse(
    localStorage.getItem('user') || '{}',
  )

  if (!token) {
    return <Navigate to="/login" />
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute