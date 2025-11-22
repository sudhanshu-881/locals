
import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  bio: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  address: z.string().optional(),
  skills: z.array(z.string()).optional(),
  hourly_rate: z.number().optional(),
});
