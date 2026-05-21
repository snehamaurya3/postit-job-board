import { api } from './api'

export const recruiterApi =
  api.injectEndpoints({
    endpoints: (builder) => ({

      // CREATE JOB
      createJob:
        builder.mutation({
          query: (body) => ({
            url: '/jobs',
            method: 'POST',
            body,
          }),

          invalidatesTags: [
            'Jobs',
          ],
        }),

      // UPDATE JOB
      updateJob:
        builder.mutation({
          query: ({
            id,
            ...body
          }) => ({
            url: `/jobs/${id}`,
            method: 'PATCH',
            body,
          }),

          invalidatesTags: [
            'Jobs',
          ],
        }),

      // DELETE JOB
      deleteJob:
        builder.mutation({
          query: (id) => ({
            url: `/jobs/${id}`,
            method: 'DELETE',
          }),

          invalidatesTags: [
            'Jobs',
          ],
        }),

    }),
  })

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = recruiterApi