import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'
import picture1 from '../assets/picture1.avif'

import {
  useGetJobsQuery,
} from '../services/jobsApi'

import { Link } from 'react-router-dom'

function HomePage() {

  const {
    data,
    isLoading,
  } = useGetJobsQuery('')

  const jobs = data || []

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <h1 className="text-6xl font-bold leading-tight">
              Find Your Dream Job Today
            </h1>

            <p className="text-gray-500 text-xl mt-6 leading-9">
              Discover opportunities from top companies
              and apply with ease.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/jobs"
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"
              >
                Browse Jobs
              </Link>

              <Link
                to="/register"
                className="bg-white border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">

            <img
              src={picture1}
              alt="Job Application"
              className="w-full max-w-xl rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-4xl font-bold">
              Latest Jobs
            </h2>

            <p className="text-gray-500 mt-3">
              Explore recent openings
            </p>
          </div>
        </div>

        {isLoading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {jobs.map((job: any) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage