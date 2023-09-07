import * as z from "zod";

import { validateTheme } from "@/lib/validators/workspace";

export const newTeamSchema = z
    .object({
        name: z.string().min(3).max(32),
        ownerId: z.string(),
        color: z.string(),
        workspace: z.string().min(3).max(32),
        emails: z.string().email().array(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });
