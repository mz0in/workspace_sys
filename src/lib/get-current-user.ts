import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth/next-auth-options";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user;
}
