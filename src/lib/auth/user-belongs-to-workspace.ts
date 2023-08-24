import { db } from "@/lib/database";

export async function userBelongsToWorkspace(userId: string, workspaceId: string) {
    // TODO: Need to account for if a user is in a team
    const workspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
        },
        include: {
            members: true,
        },
    });
    if (!workspace) return false;
    const userInWorkspace = workspace.members.map(member => member.userId).includes(userId);
    return userInWorkspace;
}
