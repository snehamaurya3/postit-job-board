import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'

import {
  useCreateJobMutation,
} from '../services/recruiterApi'

function CreateJobPage() {

  const navigate = useNavigate()

  const [
    createJob,
    { isLoading },
  ] = useCreateJobMutation()

  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = async (
    data: any,
  ) => {
    try {

      await createJob(data).unwrap()

      toast.success(
        'Job created successfully',
      )

      navigate('/recruiter')

    } catch (error: any) {

      toast.error(
        error?.data?.message ||
          'Failed to create job',
      )
    }
  }

  return (
    <div className="bg-[#f7f7fb] min-h-screen">
      
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          
          <h1 className="text-4xl font-bold mb-10">
            Create Job
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <input
              {...register('title')}
              placeholder="Job Title"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              {...register('companyName')}
              placeholder="Company Name"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              {...register('location')}
              placeholder="Location"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              {...register('salary')}
              placeholder="Salary"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

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

            <textarea
              {...register('description')}
              placeholder="Description"
              rows={6}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition"
            >
              {isLoading
                ? 'Creating...'
                : 'Create Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJobPage