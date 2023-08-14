import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return new Response(null, { status: 403 });
        }
        const workspaces = await db.workspace.findMany({
            where: {
                userId: user.id,
            },
        });
        return new Response(JSON.stringify({ workspaces: workspaces }));
    } catch (error) {
        return new Response(null, { status: 500 });
    }
}
