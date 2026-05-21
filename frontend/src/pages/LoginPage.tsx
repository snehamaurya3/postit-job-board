import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import {
  loginSchema,
  type LoginFormData,
} from '../utils/validators/authSchemas'

import { useLoginMutation } from '../services/authApi'

import AuthLayout from '../layouts/AuthLayout'

function LoginPage() {

  const navigate = useNavigate()

  const [login, { isLoading }] =
    useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (
    data: LoginFormData,
  ) => {

    try {

      const response: any =
        await login(data).unwrap()

      console.log(response)

      localStorage.setItem(
        'token',
        response.access_token,
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.user),
      )

      toast.success('Login successful')

      const role = response?.user?.role

      if (role === 'recruiter') {

        navigate('/recruiter')

      } else if (
        role === 'applicant'
      ) {

        navigate('/applicant')

      } else {

        toast.error('Role not found')
      }

    } catch (error: any) {

      console.log(error)

      toast.error(
        error?.data?.message ||
          'Login failed',
      )
    }
  }

  return (
    <AuthLayout>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

        <h2 className="text-3xl font-bold mb-2">
          Login
        </h2>

        <p className="text-gray-500 mb-8">
          Welcome back to PostIt
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              {...register('email')}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-black"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-black"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >

            {isLoading
              ? 'Logging in...'
              : 'Login'}

          </button>

          {/* Register Link */}

          <div className="text-center pt-2">

            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?
            </p>

            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create Account
            </Link>

          </div>

        </form>

      </div>

    </AuthLayout>
  )
}

export default LoginPage