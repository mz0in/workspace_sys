import type { TeamMembership } from "@prisma/client";
import * as z from "zod";

import { userBelongsToTeam } from "@/lib/auth/user-permission-utils";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";

const routeCtxSchema = z.object({
    params: z.object({ slug: z.string() }),
});

export async function DELETE(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        const { params } = routeCtxSchema.parse(ctx);

        const user = await getCurrentUser();
        if (!user || !userBelongsToTeam(user.id, params.slug)) {
            return new Response("Unauthorized", { status: 403 });
        }
        const team = await db.team.findFirst({
            where: { slug: params.slug },
            include: {
                ownedWorkspaces: true,
                members: true,
            },
        });
        if (!team) {
            return new Response("Team not found.", { status: 404 });
        }
        const deletingUser = team.members.filter((member) => member.userId === user.id)[0];
        if (!deletingUser || deletingUser.role !== "owner") {
            return new Response("Unauthorized", { status: 403 });
        }
        // delete all workspaces associated with team
        // will cascade to all other data
        await db.workspace.deleteMany({
            where: { ownerTeamId: team.id },
        });
        // delete team and members
        await db.team.delete({
            where: {
                id: team.id,
            },
        });
        await switchMemberWorkspaces(team.members);
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}

async function switchMemberWorkspaces(members: TeamMembership[]) {
    for (const mem of members) {
        const workspace = await db.workspaceMembership.findFirstOrThrow({
            where: {
                userId: mem.userId,
                workspace: {
                    type: "personal",
                },
            },
        });
        await db.user.update({
            where: {
                id: mem.userId,
            },
            data: {
                activeWorkspaceId: workspace.id,
            },
        });
    }
}
