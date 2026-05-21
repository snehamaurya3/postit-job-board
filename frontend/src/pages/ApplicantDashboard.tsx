import Navbar from '../components/Navbar'

import { useState, useEffect } from 'react'

import JobCard from '../components/JobCard'

import {
  useGetJobsQuery,
} from '../services/jobsApi'

import {
  useGetMyApplicationsQuery,
} from '../services/applicationApi'

function ApplicantDashboard() {

  // SEARCH
  const [search, setSearch] =
    useState('')

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState('')

  // DEBOUNCE
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search)

    }, 500)

    return () =>
      clearTimeout(timer)

  }, [search])

  // ALL JOBS
  const {
    data: jobsData,
    isLoading: jobsLoading,
  } = useGetJobsQuery(
    debouncedSearch,
  )

  // MY APPLICATIONS
  const {
    data: applicationsData,
    isLoading:
      applicationsLoading,
  } =
    useGetMyApplicationsQuery(
      {},
    )

  const jobs = jobsData || []

  const applications =
    applicationsData || []

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* PAGE TITLE */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Applicant Dashboard
          </h1>

          <p className="text-gray-500 mt-3">
            Explore jobs and track
            your applications
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-14">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="w-full md:w-[420px] px-5 py-4 rounded-2xl border border-gray-300 outline-none bg-white shadow-sm"
          />
        </div>

        {/* ALL JOBS */}
        <div className="mb-20">

          <h2 className="text-3xl font-bold mb-8">
            Available Jobs
          </h2>

          {jobsLoading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {jobs.map(
                (job: any) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {/* MY APPLICATIONS */}
        <div>

          <h2 className="text-3xl font-bold mb-8">
            My Applications
          </h2>

          {applicationsLoading ? (
            <p>
              Loading
              applications...
            </p>
          ) : applications.length ===
            0 ? (
            <p>
              You have not applied
              yet
            </p>
          ) : (
            <div className="space-y-6">

              {applications.map(
                (
                  application: any,
                ) => {

                  const job =
                    application.job

                  return (
                    <div
                      key={
                        application.id
                      }
                      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                    >

                      {/* JOB REMOVED */}
                      {!job ? (
                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="text-2xl font-bold text-red-500">
                              Job Removed
                            </h3>

                            <p className="text-gray-500 mt-2">
                              This job is
                              no longer
                              available
                            </p>
                          </div>

                          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium">
                            Removed
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between">

                            <div>

                              <h3 className="text-2xl font-bold">
                                {
                                  job.title
                                }
                              </h3>

                              <p className="text-gray-500 mt-2">
                                {
                                  job.companyName
                                }
                              </p>

                              <div className="flex flex-wrap gap-3 mt-5">

                                <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
                                  {
                                    job.location
                                  }
                                </span>

                                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-sm">
                                  {
                                    job.jobType
                                  }
                                </span>

                                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-sm">
                                  ₹{' '}
                                  {
                                    job.salary
                                  }
                                </span>
                              </div>
                            </div>

                            <span
                              className={`px-4 py-2 rounded-xl font-medium capitalize

                              ${
                                application.status ===
                                'accepted'
                                  ? 'bg-green-100 text-green-600'
                                  : application.status ===
                                    'rejected'
                                  ? 'bg-red-100 text-red-600'
                                  : 'bg-yellow-100 text-yellow-700'
                              }
                            `}
                            >
                              {
                                application.status
                              }
                            </span>
                          </div>

                          <div className="mt-6 border-t pt-5">

                            <p className="text-gray-700 leading-7">
                              {
                                job.description
                              }
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )
                },
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicantDashboard