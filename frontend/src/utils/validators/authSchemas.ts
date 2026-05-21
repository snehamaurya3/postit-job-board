import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required'),

  email: z.email('Invalid email'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),

  role: z.enum(['applicant', 'recruiter']),
})

export type LoginFormData = z.infer<
  typeof loginSchema
>

export type RegisterFormData = z.infer<
  typeof registerSchema
>