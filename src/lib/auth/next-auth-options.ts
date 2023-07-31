import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import WorkspaceAdapter from "@/lib/auth/next-auth-adapter";
import { db } from "@/lib/database";

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            const updatedSession: Session = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                },
            };
            return updatedSession;
        },
        jwt: async ({ user, token, trigger }) => {
            if (user) {
                token.user = user;
            }
            if (trigger === "update") {
                const refreshedUser = await db.user.findUnique({
                    where: { id: token.sub },
                });
                token.user = refreshedUser;
                token.email = refreshedUser?.email;
                token.image = refreshedUser?.image;
            }
            return token;
        },
    },
    adapter: WorkspaceAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
};
