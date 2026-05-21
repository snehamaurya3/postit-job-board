import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const token =
    localStorage.getItem('token')

  const user = JSON.parse(
    localStorage.getItem('user') ||
      'null',
  )

  const handleLogout = () => {

    localStorage.removeItem(
      'token',
    )

    localStorage.removeItem(
      'user',
    )

    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          PostIt
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4">

          <Link
            to="/jobs"
            className="text-gray-700 hover:text-indigo-600"
          >
            Jobs
          </Link>

          {/* IF LOGGED IN */}
          {token ? (
            <>

              {/* DASHBOARD */}
              <Link
                to={
                  user?.role ===
                  'recruiter'
                    ? '/recruiter'
                    : '/applicant'
                }
                className="text-gray-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar