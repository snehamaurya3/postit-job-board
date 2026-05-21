import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* Left Side */}
      <div className="hidden lg:flex bg-black text-white flex-col justify-center px-20">
        <h1 className="text-5xl font-bold leading-tight">
          Find Your Dream Job
        </h1>

        <p className="mt-6 text-gray-300 text-lg">
          Connect with top companies and build
          your future career with PostIt.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout