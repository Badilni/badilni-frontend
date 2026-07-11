import { z } from 'zod'

export const RequestSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title is too long'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description is too long'),
  creditsOffered: z
    .union([z.string(), z.number()])
    .refine((v) => !Number.isNaN(Number(v)), 'Credits must be a number')
    .transform((v) => Number(v))
    .refine((v) => v > 0, 'Credits must be greater than 0'),
  deadline: z.string().min(1, 'Deadline is required'),
  images: z.object({
    existing: z.array(z.any()),
    files: z.array(z.any()),
  }),
})

export const requestDefaultValues = {
  category: '',
  title: '',
  description: '',
  creditsOffered: '',
  deadline: '',
  images: { existing: [], files: [] },
}
