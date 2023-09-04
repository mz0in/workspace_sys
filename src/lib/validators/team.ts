import * as z from "zod";

import { validateTheme } from "@/lib/validators/workspace";

export const newTeamSchema = z
    .object({
        name: z.string().min(3).max(32),
        slug: z.string(),
        color: z.string(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });
