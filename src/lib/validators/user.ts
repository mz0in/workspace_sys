import * as z from "zod";

export const editUserSchema = z.object({
    name: z.string().min(3).max(24),
});

export const updateUserWorkspaceSchema = z.object({
    newWorkspaceId: z.string().cuid(),
});
