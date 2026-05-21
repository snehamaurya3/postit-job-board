import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'

import toast from 'react-hot-toast'

import {
  useDeleteJobMutation,
} from '../services/recruiterApi'

import {
  useGetJobsQuery,
} from '../services/jobsApi'

import {
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from '../services/applicationApi'

import {
  useState,
  useEffect,
} from 'react'

function RecruiterDashboard() {

  // SEARCH
  const [search, setSearch] =
    useState('')

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState('')

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search)

    }, 500)

    return () =>
      clearTimeout(timer)

  }, [search])

  // JOBS
  const {
    data,
    isLoading,
  } = useGetJobsQuery(
    debouncedSearch,
  )

  const jobs = data || []

  // DELETE JOB
  const [
    deleteJob,
  ] = useDeleteJobMutation()

  // APPLICANTS
  const {
    data: applicantsData,
    isLoading: applicantsLoading,
  } = useGetJobApplicantsQuery({})

  const applicants =
    applicantsData || []

  // UPDATE STATUS
  const [
    updateApplicationStatus,
  ] =
    useUpdateApplicationStatusMutation()

  const handleDelete = async (
    id: string,
  ) => {

    const confirmDelete =
      window.confirm(
        'Delete this job?',
      )

    if (!confirmDelete) return

    try {

      await deleteJob(id).unwrap()

      toast.success(
        'Job deleted',
      )

    } catch (error: any) {

      toast.error(
        error?.data?.message ||
          'Delete failed',
      )
    }
  }

  const handleStatusUpdate =
    async (
      id: string,
      status: string,
    ) => {

      try {

        await updateApplicationStatus({
          id,
          status,
        }).unwrap()

        toast.success(
          'Application updated',
        )

      } catch (error: any) {

        toast.error(
          error?.data?.message ||
            'Update failed',
        )
      }
    }

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

          <div>
            <h1 className="text-4xl font-bold">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-500 mt-3">
              Manage jobs and applicants
            </p>
          </div>

          <Link
            to="/create-job"
            className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"
          >
            Create Job
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-12">

          <input
            type="text"
            placeholder="Search jobs by title, company, location..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="w-full md:w-[450px] px-5 py-4 rounded-2xl border border-gray-300 outline-none bg-white shadow-sm"
          />
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

            <p className="text-gray-500">
              Total Jobs
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

            <p className="text-gray-500">
              Active Jobs
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

            <p className="text-gray-500">
              Total Applicants
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {applicants.length}
            </h2>
          </div>
        </div>

        {/* JOB LIST */}
        <div className="mb-20">

          <h2 className="text-3xl font-bold mb-8">
            Posted Jobs
          </h2>

          {isLoading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {jobs.map((job: any) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                >

                  {/* COMPANY */}
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {job.companyName?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {job.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {job.companyName}
                      </p>
                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="mt-6 flex flex-wrap gap-3">

                    <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
                      {job.location}
                    </span>

                    <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-sm">
                      {job.jobType}
                    </span>
                  </div>

                  {/* SALARY */}
                  <div className="mt-8 flex items-center justify-between">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Salary
                      </p>

                      <h4 className="text-2xl font-bold mt-1">
                        ₹ {job.salary}
                      </h4>
                    </div>

                    <div className="flex gap-3">

                      <Link
                        to={`/edit-job/${job.id}`}
                        className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(job.id)
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* APPLICANTS */}
        <div>

          <h2 className="text-3xl font-bold mb-8">
            Applicants
          </h2>

          {applicantsLoading ? (
            <p>Loading applicants...</p>
          ) : applicants.length === 0 ? (
            <p>No applicants yet</p>
          ) : (
            <div className="space-y-6">

              {applicants.map(
                (application: any) => (
                  <div
                    key={application.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                      {/* LEFT */}
                      <div>

                        <h3 className="text-2xl font-bold">
                          {
                            application.job
                              ?.title
                          }
                        </h3>

                        <p className="text-gray-500 mt-2">
                          {
                            application.job
                              ?.companyName
                          }
                        </p>

                        <div className="flex gap-3 mt-4">

                          <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                            {
                              application.job
                                ?.location
                            }
                          </span>

                          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-sm">
                            {
                              application.job
                                ?.jobType
                            }
                          </span>
                        </div>

                        {/* APPLICANT INFO */}
                        <div className="mt-6">

                          <p className="font-semibold">
                            Applicant
                          </p>

                          <p className="mt-1">
                            {
                              application
                                .applicant
                                ?.name
                            }
                          </p>

                          <p className="text-gray-500">
                            {
                              application
                                .applicant
                                ?.email
                            }
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-col items-start lg:items-end gap-4">

                        <span
                          className={`px-4 py-2 rounded-xl capitalize

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

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                application.id,
                                'accepted',
                              )
                            }
                            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                application.id,
                                'rejected',
                              )
                            }
                            className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard