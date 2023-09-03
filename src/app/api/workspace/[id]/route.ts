import * as z from "zod";

import { userBelongsToWorkspace } from "@/lib/auth/user-belongs-to-workspace";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { editWorkspaceSchema } from "@/lib/validators/workspace";

const routeCtxSchema = z.object({
    params: z.object({ id: z.string().cuid() }),
});

export async function PATCH(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        // validate route context
        const { params } = routeCtxSchema.parse(ctx);

        // validate a user is logged in and that the user is the same as the context
        const user = await getCurrentUser();
        if (!user) {
            return new Response("Unauthorized", { status: 403 });
        }
        const body = await req.json();
        const payload = editWorkspaceSchema.parse(body);

        // check if workspace exists
        const workspace = await db.workspace.findFirst({
            where: { id: params.id },
        });
        if (!workspace) {
            return new Response("Workspace not found", { status: 404 });
        }
        if (!userBelongsToWorkspace(user.id, params.id)) {
            return new Response("Unauthorized", { status: 403 });
        }

        await db.workspace.update({
            where: {
                id: params.id,
            },
            data: {
                name: payload.name,
                color: payload.color,
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

export async function DELETE(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        // validate route context
        const { params } = routeCtxSchema.parse(ctx);

        // validate a user is logged in and that the user is the same as the context
        const user = await getCurrentUser();
        if (!user) {
            return new Response("Unauthorized", { status: 403 });
        }
        const workspace = await db.workspace.findFirst({
            where: {
                id: params.id,
            },
            include: {
                members: true,
            },
        });
        if (!workspace) {
            return new Response("Workspace does not exist", { status: 404 });
        }
        const workspaceUser = workspace.members.filter((w) => w.userId === user.id);
        if (workspaceUser.length === 0 || !workspaceUser.map((wu) => wu.role).includes("owner")) {
            return new Response("Unauthorized", { status: 403 });
        }
        // Make sure user doesn't delete last workspace
        const workspaces = await db.workspaceMembership.findMany({
            where: {
                userId: user.id,
            },
            select: { workspace: true },
        });
        if (workspaces.filter((w) => w.workspace.type === "personal").length <= 1) {
            return new Response("Cannot delete your last personal workspace");
        }
        // Make sure we switch activeWorkspace on user!
        const newWorkspace = workspaces.filter((w) => w.workspace.id !== workspace.id)[0];
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                activeWorkspaceId: newWorkspace.workspace.id,
            },
        });
        await db.workspaceMembership.delete({
            where: {
                id: workspaceUser[0].id,
            },
        });
        await db.workspace.delete({
            where: {
                id: workspace.id,
            },
        });
        console.log("here2");
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}
