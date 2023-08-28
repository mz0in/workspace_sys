import * as z from "zod";

import { userBelongsToWorkspace } from "@/lib/auth/user-belongs-to-workspace";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { updateUserWorkspaceSchema } from "@/lib/validators/user";
import { newWorkspaceSchema } from "@/lib/validators/workspace";

const routeCtxSchema = z.object({
    params: z.object({ id: z.string().cuid() }),
});

export async function POST(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        const { params } = routeCtxSchema.parse(ctx);

        const user = await getCurrentUser();
        if (!user || user.id !== params.id) {
            return new Response("Unauthorized", { status: 403 });
        }
        const json = await req.json();
        const body = newWorkspaceSchema.parse(json);

        const workspace = await db.workspace.create({
            data: {
                name: body.name,
                color: body.color,
            },
        });
        await db.workspaceMembership.create({
            data: {
                userId: user.id,
                workspaceId: workspace.id,
                role: "owner",
            },
        });
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                activeWorkspaceId: workspace.id,
            },
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        const { params } = routeCtxSchema.parse(ctx);

        const user = await getCurrentUser();
        if (!user || user.id !== params.id) {
            return new Response("Unauthorized", { status: 403 });
        }
        const json = await req.json();
        const body = updateUserWorkspaceSchema.parse(json);
        if (!userBelongsToWorkspace(user.id, body.newWorkspaceId)) {
            return new Response("Unauthorized", { status: 403 });
        }
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                activeWorkspaceId: body.newWorkspaceId,
            },
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}
