import * as z from "zod";

import { getRandomTheme } from "@/config/constants";
import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { newTeamSchema } from "@/lib/validators/team";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return new Response("Unauthorized", { status: 403 });
        }
        const json = await req.json();
        const body = newTeamSchema.parse(json);

        const teamExists = await db.team.findFirst({
            where: {
                slug: body.slug,
            },
        });
        if (teamExists) {
            return new Response("URL already exists", { status: 403 });
        }
        const team = await db.team.create({
            data: {
                name: body.name,
                slug: body.slug,
                color: body.color,
                members: {
                    create: [{ userId: body.ownerId, role: "owner" }],
                },
            },
        });
        const workspace = await db.workspace.create({
            data: {
                name: body.workspace,
                color: getRandomTheme(),
                type: "team",
                ownerTeamId: team.id,
                members: {
                    create: [{ userId: body.ownerId, role: "owner" }],
                },
            },
        });
        await db.user.update({
            where: {
                id: body.ownerId,
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
