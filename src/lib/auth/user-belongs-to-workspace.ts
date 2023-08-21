import { db } from "@/lib/database";

export async function userBelongsToWorkspace(userId: string, workspaceId: string) {
    // TODO: Need to account for if a user is in a team
    const userInWorkspace = await db.workspace.findFirst({
        where: {
            id: workspaceId,
            userId: userId,
        },
    });
    if (userInWorkspace) return true;
    return false;
}
