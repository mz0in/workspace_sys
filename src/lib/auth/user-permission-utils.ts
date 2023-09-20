import { db } from "@/lib/database";

export async function userBelongsToWorkspace(userId: string, workspaceId: string) {
    const workspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
        },
        include: {
            members: true,
        },
    });
    if (!workspace) return false;
    return workspace.members.map((member) => member.userId).includes(userId);
}

export async function userBelongsToTeam(userId: string, slug: string) {
    const team = await db.team.findFirst({
        where: {
            slug: slug,
        },
        include: {
            members: true,
        },
    });
    if (!team) return false;
    return team.members.map((member) => member.userId).includes(userId);
}
