import Navbar from '../components/Navbar'

import {
  useGetJobsQuery,
} from '../services/jobsApi'

import JobCard from '../components/JobCard'

function JobsPage() {

  const {
    data,
    isLoading,
  } = useGetJobsQuery('')

  const jobs = data || []

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        <h1 className="text-4xl font-bold mb-10">
          All Jobs
        </h1>

        {isLoading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {jobs.map((job: any) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobsPage