import * as z from "zod";

import { WORKSPACE_THEMES } from "@/config/constants";

export const editWorkspaceSchema = z
    .object({
        name: z.string().min(3).max(32),
        color: z.string(),
    })
    .refine(
        (data) => {
            return validateTheme(data.color);
        },
        { message: "Invalid theme", path: ["color"] },
    );

export const newWorkspaceSchema = z
    .object({
        name: z.string().min(3).max(32),
        color: z.string(),
        type: z.enum(["personal", "team"]),
    })
    .refine(
        (data) => {
            return validateTheme(data.color);
        },
        { message: "Invalid theme", path: ["color"] },
    );

export function validateTheme(color: string): boolean {
    const validOptions = WORKSPACE_THEMES.map((w) => w.value);
    if (!validOptions.includes(color)) {
        return false;
    }
    return true;
}
