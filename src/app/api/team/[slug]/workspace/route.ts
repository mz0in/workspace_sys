import * as z from "zod";

import { userBelongsToTeam } from "@/lib/auth/user-permission-utils";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { newWorkspaceSchema } from "@/lib/validators/workspace";

const routeCtxSchema = z.object({
    params: z.object({ slug: z.string() }),
});

export async function POST(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        const { params } = routeCtxSchema.parse(ctx);

        const user = await getCurrentUser();
        if (!user || !userBelongsToTeam(user.id, params.slug)) {
            return new Response("Unauthorized", { status: 403 });
        }
        const team = await db.team.findFirst({
            where: { slug: params.slug },
            // get team members and add all of them to new workspace
            // TODO: Should eventually implement workspace permissions for pro teams
            include: {
                members: true,
            },
        });
        if (!team) {
            return new Response("Team not found.", { status: 404 });
        }
        // Only owners or admins can add new workspaces, so check if user is one of those roles.
        const currentUser = team.members.filter((member) => member.userId === user.id);
        if (!currentUser || !["owner", "admin"].includes(currentUser[0]!.role)) {
            return new Response("Unauthorized", { status: 403 });
        }
        const json = await req.json();
        const body = newWorkspaceSchema.parse(json);

        const workspace = await db.workspace.create({
            data: {
                name: body.name,
                type: "team",
                color: body.color,
                ownerTeamId: team.id,
            },
        });
        for (const mem of team.members) {
            await db.workspaceMembership.create({
                data: {
                    workspaceId: workspace.id,
                    role: mem.userId === user.id ? "owner" : "member",
                    userId: mem.userId,
                },
            });
        }
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
