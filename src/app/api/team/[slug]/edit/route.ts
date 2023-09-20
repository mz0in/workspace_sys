import * as z from "zod";

import { userBelongsToTeam } from "@/lib/auth/user-permission-utils";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { editTeamSchema } from "@/lib/validators/team";

const routeCtxSchema = z.object({
    params: z.object({ slug: z.string() }),
});

export async function PATCH(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        // validate route context
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
        const body = editTeamSchema.parse(json);
        await db.team.update({
            where: {
                id: team.id,
            },
            data: {
                slug: body.slug,
                name: body.name,
                color: body.color,
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
