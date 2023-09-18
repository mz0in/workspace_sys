import * as z from "zod";

import { validateTheme } from "@/config/themes";

export const newTeamSchema = z
    .object({
        slug: z
            .string({ required_error: "Required" })
            .min(3, { message: "Must be at least 3 characters" })
            .max(32),
        name: z
            .string({ required_error: "Required" })
            .min(3, { message: "Must be at least 3 characters" })
            .max(32),
        ownerId: z.string(),
        color: z.string(),
        workspace: z.string().min(3).max(32),
        emails: z.string().email().array(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });

export const editTeamSchema = z
    .object({
        name: z.string().min(3).max(32),
        slug: z.string().min(3).max(32),
        color: z.string(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });
