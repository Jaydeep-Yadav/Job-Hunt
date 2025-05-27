import { z } from 'zod';

export const registerCompanySchema = z.object({
    companyName: z
        .string({ required_error: "Company Name is required" })
        .min(2, { message: 'Company Name must be at least 2 characters long' })
        .max(100, { message: 'Company Name must not exceed 100 characters' }),
})

export const updateCompanySchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Company Name must be at least 2 characters long' })
        .max(100, { message: 'Company Name must not exceed 100 characters' })
        .optional(),

    description: z
        .string()
        .max(1000, { message: 'Description must not exceed 1000 characters' })
        .optional(),

    website: z
        .string()
        .url()
        .optional(),
    
    location: z
        .string()
        .max(200, { message: 'Location must not exceed 200 characters' })
        .optional(),

})