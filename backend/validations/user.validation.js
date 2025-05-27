import { z } from 'zod';

export const userRegisterSchema = z.object({
  fullname: z
    .string({ required_error: "Full Name is required" })
    .min(3, { message: 'Full name must be at least 3 characters long' })
    .max(50, { message: 'Full name must not exceed 50 characters' }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: 'Invalid email format' }),

  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' }),

  role: z
    .enum(['jobseeker', 'recruiter'], { message: 'Role must be either jobseeker or recruiter' })
});

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: 'Invalid email format' }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' }),

  role: z
    .enum(['jobseeker', 'recruiter'], { message: 'Role must be either jobseeker or recruiter' })
});


export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .optional(),

  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),

  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional(),

  skills: z
    .array(z.string().min(1, "Skill must not be empty"))
    .optional()
});