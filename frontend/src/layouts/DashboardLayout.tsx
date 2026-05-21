import type { ReactNode } from 'react'

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  LogOut,
} from 'lucide-react'

type Props = {
  children: ReactNode
}

function DashboardLayout({
  children,
}: Props) {
  const user = JSON.parse(
    localStorage.getItem('user') || '{}',
  )

  const logout = () => {
    localStorage.clear()

    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-72 bg-black text-white p-6 flex flex-col">
        
        <h1 className="text-3xl font-bold mb-10">
          PostIt
        </h1>

        <nav className="space-y-4 flex-1">
          
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-900 transition">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-900 transition">
            <Briefcase size={20} />
            Jobs
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-900 transition">
            <FileText size={20} />
            Applications
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        
        {/* Topbar */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm flex justify-between items-center mb-8">
          
          <div>
            <h2 className="text-2xl font-bold">
              Welcome Back
            </h2>

            <p className="text-gray-500">
              {user?.name}
            </p>
          </div>

          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0)}
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}

export default DashboardLayout