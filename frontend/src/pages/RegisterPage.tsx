import { useForm } from 'react-hook-form'

import { useNavigate, Link } from 'react-router-dom'

import toast from 'react-hot-toast'

import AuthLayout from '../layouts/AuthLayout'

import {
  useRegisterMutation,
} from '../services/authApi'

function RegisterPage() {

  const navigate = useNavigate()

  const [
    registerUser,
    { isLoading },
  ] = useRegisterMutation()

  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = async (
    data: any,
  ) => {
    try {

      console.log(data)

      await registerUser(data).unwrap()

      toast.success(
        'Registration successful',
      )

      navigate('/login')

    } catch (error: any) {

      console.log(error)

      toast.error(
        error?.data?.message ||
        'Registration failed',
      )
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

        <h2 className="text-3xl font-bold mb-2">
          Create Account
        </h2>

        <p className="text-gray-500 mb-8">
          Start your journey with PostIt
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            {...register('name')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
          />

          <select
            {...register('role')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none"
          >
            <option value="">
              Select Role
            </option>

            <option value="applicant">
              Applicant
            </option>

            <option value="recruiter">
              Recruiter
            </option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {isLoading
              ? 'Registering...'
              : 'Register'}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{' '}

            <Link
              to="/login"
              className="text-black font-semibold"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage