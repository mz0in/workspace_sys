import * as z from "zod";

import { WORKSPACE_THEMES } from "@/config/constants";

export const editWorkspaceSchema = z
    .object({
        name: z.string().min(3).max(32),
        color: z.string(),
    })
    .refine(
        (data) => {
            const validOptions = WORKSPACE_THEMES.map((w) => w.value);
            if (!validOptions.includes(data.color)) {
                return false;
            }
            return true;
        },
        { message: "Invalid workspace theme", path: ["color"] },
    );
