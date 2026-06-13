import * as z from 'zod'

const signupFormValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be at least 3 characters.' })
      .max(30, { message: 'Name must be at most 30 characters.' })
      .regex(/^[a-zA-Z]/, { message: 'Name must start with a letter.' }),

    email: z.email({ message: 'Invalid email address.' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number.',
      })
      .regex(/[@$!%*?&]/, {
        message: 'Password must contain at least one special character (@$!%*?&).',
      }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

const resetPasswordValidationSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number.',
      })
      .regex(/[@$!%*?&]/, {
        message: 'Password must contain at least one special character (@$!%*?&).',
      }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })


const signinFormValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),

  password: z
    .string()
    .min(1, { message: 'Password is required.' }),
})

const verificationCodeSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, { message: 'Required' })
      .regex(/^[a-zA-Z0-9]$/, { message: 'Must be a single alphanumeric character' })
  )
  .length(6, { message: 'Verification code must be exactly 6 digits' })
  .transform((val) => val.join(''));
export { signupFormValidationSchema, resetPasswordValidationSchema, signinFormValidationSchema, verificationCodeSchema }
