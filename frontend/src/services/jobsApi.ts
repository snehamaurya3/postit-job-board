import { api } from './api'

export const jobsApi =
  api.injectEndpoints({
    endpoints: (builder) => ({

      // GET ALL JOBS
      getJobs: builder.query({
        query: (search = '') =>
          `/jobs?search=${search}`,

        providesTags: ['Jobs'],
      }),

      // GET SINGLE JOB
      getJobById: builder.query({
        query: (id) =>
          `/jobs/${id}`,

        providesTags: ['Jobs'],
      }),

    }),
  })

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
} = jobsApi