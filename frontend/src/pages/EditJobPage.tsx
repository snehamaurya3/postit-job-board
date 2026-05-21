import {
  useParams,
  useNavigate,
} from 'react-router-dom'

import {
  useGetJobByIdQuery,
} from '../services/jobsApi'

import {
  useUpdateJobMutation,
} from '../services/recruiterApi'

import {
  useForm,
} from 'react-hook-form'

import {
  useEffect,
} from 'react'

import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'

function EditJobPage() {

  const { id } = useParams()

  const navigate = useNavigate()

  // GET SINGLE JOB
  const {
    data: job,
    isLoading: jobLoading,
  } = useGetJobByIdQuery(id)

  // UPDATE JOB
  const [
    updateJob,
    { isLoading },
  ] = useUpdateJobMutation()

  // FORM
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  // PREFILL FORM
  useEffect(() => {

    if (job) {

      reset({
        title: job.title,
        companyName:
          job.companyName,
        location: job.location,
        salary: job.salary,
        description:
          job.description,
        jobType: job.jobType,
      })
    }

  }, [job, reset])

  // SUBMIT
  const onSubmit = async (
    formData: any,
  ) => {

    try {

      await updateJob({
        id,
        ...formData,
      }).unwrap()

      toast.success(
        'Job updated successfully',
      )

      navigate('/recruiter')

    } catch (error: any) {

      toast.error(
        error?.data?.message ||
          'Update failed',
      )
    }
  }

  // LOADING
  if (jobLoading) {
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

      <div className="max-w-3xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl p-10 shadow-sm">

          <h1 className="text-4xl font-bold mb-10">
            Edit Job
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* TITLE */}
            <input
              {...register('title')}
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            {/* COMPANY */}
            <input
              {...register('companyName')}
              placeholder="Company Name"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            {/* LOCATION */}
            <input
              {...register('location')}
              placeholder="Location"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            {/* SALARY */}
            <input
              {...register('salary')}
              placeholder="Salary"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            {/* JOB TYPE */}
            <select
              {...register('jobType')}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            >
              <option value="">
                Select Job Type
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              {...register(
                'description',
              )}
              rows={6}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"
            >
              {isLoading
                ? 'Updating...'
                : 'Update Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditJobPage