import { api } from './api'

export const applicationApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      applyToJob:
        builder.mutation({

          query: (body) => ({
            url: '/applications',
            method: 'POST',
            body,
          }),
        }),

      getMyApplications:
        builder.query({

          query: () =>
            '/applications/my-applications',
        }),

      // RECRUITER
      getJobApplicants:
        builder.query({

          query: () =>
            '/applications/job-applicants',
        }),

      updateApplicationStatus:
        builder.mutation({

          query: ({
            id,
            status,
          }) => ({
            url:
              `/applications/${id}/status`,

            method: 'PATCH',

            body: { status },
          }),
        }),
    }),
  })

export const {

  useApplyToJobMutation,

  useGetMyApplicationsQuery,

  useGetJobApplicantsQuery,

  useUpdateApplicationStatusMutation,

} = applicationApi