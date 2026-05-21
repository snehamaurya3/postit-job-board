import { useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'

import {
  useGetJobByIdQuery,
} from '../services/jobsApi'

import {
  useApplyToJobMutation,
} from '../services/applicationApi'

function JobDetailsPage() {

  const { id } = useParams()

  // GET SINGLE JOB
  const {
    data: job,
    isLoading,
  } = useGetJobByIdQuery(id)

  // APPLY
  const [
    applyJob,
    { isLoading: isApplying },
  ] = useApplyToJobMutation()

  const handleApply = async () => {

    const token =
      localStorage.getItem('token')

    // LOGIN CHECK
    if (!token) {

      toast.error(
        'Please login first',
      )

      return
    }

    try {

      await applyJob({
        jobId: id,
      }).unwrap()

      toast.success(
        'Application submitted',
      )

    } catch (error: any) {

      toast.error(
        error?.data?.message ||
          'Failed to apply',
      )
    }
  }

  // LOADING
  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  // JOB NOT FOUND
  if (!job) {
    return (
      <div className="p-10">
        Job not found
      </div>
    )
  }

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl p-10 shadow-sm">

          {/* HEADER */}
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
              {job.companyName?.charAt(0)}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {job.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {job.companyName}
              </p>
            </div>
          </div>

          {/* TAGS */}
          <div className="mt-8 flex flex-wrap gap-4">

            <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl">
              {job.jobType}
            </span>

            <span className="bg-gray-100 px-4 py-2 rounded-xl">
              {job.location}
            </span>

            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl">
              ₹ {job.salary}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-12">

            <h2 className="text-2xl font-bold mb-4">
              Job Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* APPLY BUTTON */}
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="mt-12 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"
          >
            {isApplying
              ? 'Applying...'
              : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage