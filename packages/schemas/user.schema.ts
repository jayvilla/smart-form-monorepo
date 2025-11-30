import { z } from "zod";

export const UserFormSchema = z.object({
  firstName: z.string().min(2).describe("text|First Name|Enter first name"),
  lastName: z.string().min(2).describe("text|Last Name|Enter last name"),
  email: z.string().email().describe("email|Email|you@example.com"),
  password: z.string().min(8).describe("password|Password|********"),
  role: z.enum(["user", "admin", "guest"]).describe("select|Role|Choose role"),
  receiveNewsletter: z.boolean().describe("checkbox|Receive Newsletter"),
  address: z
    .object({
      street: z.string().describe("text|Street|123 Main St"),
      city: z.string().describe("text|City|San Francisco"),
      state: z.string().describe("text|State|CA"),
      zip: z.string().describe("text|ZIP Code|94107"),
    })
    .describe("group|Address"),
});

export type UserFormInput = z.infer<typeof UserFormSchema>;
