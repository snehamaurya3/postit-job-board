import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',

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