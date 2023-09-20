import * as z from "zod";

import { validateTheme } from "@/config/themes";

export const editWorkspaceSchema = z
    .object({
        name: z.string().min(3).max(32),
        color: z.string(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });

export const newWorkspaceSchema = z
    .object({
        name: z.string().min(3).max(32),
        color: z.string(),
        type: z.enum(["personal", "team"]),
        teamSlug: z.string().optional(),
    })
    .refine((data) => validateTheme(data.color), { path: ["color"], message: "Invalid theme" });
