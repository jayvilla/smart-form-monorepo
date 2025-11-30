import { z } from "zod";

export const UserFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .describe("text|First Name|Enter your first name"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .describe("text|Last Name|Enter your last name"),

  email: z
    .string()
    .email("Enter a valid email")
    .describe("email|Email|you@example.com"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .describe("password|Password|Enter your password"),

  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number")
    .optional()
    .describe("text|Phone Number|+1 (555) 123-4567"),

  dateOfBirth: z.string().describe("date|Date of Birth|"),

  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .describe("textarea|Bio|Tell us about yourself"),

  receiveNewsletter: z.boolean().describe("checkbox|Receive Newsletter"),
});

// Strong TS type from schema
export type UserFormInput = z.infer<typeof UserFormSchema>;
