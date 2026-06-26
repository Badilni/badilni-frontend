import { z } from 'zod'

const existingImageSchema = z.object({
  _id: z.string(),
  url: z.string(),
})

export const offerSchema = z.object({
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
  category: z.string().min(1, 'Please select a category'),
  hourlyRate: z
    .union([z.string(), z.number()])
    .refine(
      (v) =>
        v !== '' && v !== null && v !== undefined && !Number.isNaN(Number(v)),
      'Hourly rate must be a number'
    )
    .transform((v) => Number(v))
    .refine((v) => v > 0, 'Hourly rate must be greater than 0'),
  availabilityNotes: z
    .string()
    .trim()
    .max(500, 'Keep availability notes under 500 characters')
    .optional()
    .or(z.literal('')),
  tags: z.array(z.string().trim().min(1)).max(10, 'Up to 10 tags'),
  isActive: z.boolean(),
  images: z.object({
    existing: z.array(existingImageSchema),
    files: z.array(z.any()),
  }),
})

export const offerDefaultValues = {
  title: '',
  description: '',
  category: '',
  hourlyRate: '',
  availabilityNotes: '',
  tags: [],
  isActive: true,
  images: { existing: [], files: [] },
}
