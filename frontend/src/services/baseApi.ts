import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = fetchBaseQuery({
  baseUrl: 'https://postit-job-board.onrender.com',  //after successful backend deployment

  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')

    if (token) {
      headers.set(
        'Authorization',
        `Bearer ${token}`,
      )
    }

    return headers
  },
})