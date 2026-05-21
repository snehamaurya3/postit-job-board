import { Link } from 'react-router-dom'

import toast from 'react-hot-toast'

import {
  useApplyToJobMutation,
} from '../services/applicationApi'

type Props = {
  job: any
}

function JobCard({ job }: Props) {

  const [applyJob] =
    useApplyToJobMutation()

  const handleApply = async (
    e: React.MouseEvent,
  ) => {

    // STOP LINK REDIRECT
    e.preventDefault()

    e.stopPropagation()

    const token =
      localStorage.getItem('token')

    // IF USER NOT LOGGED IN
    if (!token) {

      toast.error(
        'Please login first',
      )

      return
    }

    try {

      await applyJob(job.id).unwrap()

      toast.success(
        'Applied successfully',
      )

    } catch (error: any) {

      toast.error(
        error?.data?.message ||
          'Application failed',
      )
    }
  }

  return (
    <Link
  to={`/jobs/${job.id}`}
  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition block"
>

      {/* COMPANY */}
      <div className="flex items-center gap-3">
        
{/* company logo by taking out the first letter from its name */}
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
          {job.companyName?.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {job.title}
          </h3>

          <p className="text-gray-500 text-sm">
            {job.companyName}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">

        <span className="bg-gray-100 px-3 py-1 rounded-lg">
          {job.location}
        </span>

        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg">
          {job.jobType}
        </span>
      </div>

      {/* SALARY */}
      <div className="mt-6 flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            Salary
          </p>

          <h4 className="font-bold text-lg">
            ₹ {job.salary}
          </h4>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Apply
        </button>
      </div>
    </Link>
  )
}

export default JobCard