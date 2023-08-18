import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import WorkspaceAdapter from "@/lib/auth/next-auth-adapter";
import { db } from "@/lib/database";

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            // prettier-ignore
            const updatedSession: Session = {
                ...session,
                user: {
                    id: token.id, name: token.name, email: token.email, image: token.picture,
                },
            };
            return updatedSession;
        },
        jwt: async ({ user, token }) => {
            const userFromPrisma = await db.user.findFirst({
                where: { email: token.email },
            });
            if (!userFromPrisma) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }
            // prettier-ignore
            return {
                id: userFromPrisma.id, name: userFromPrisma.name, email: userFromPrisma.email, picture: userFromPrisma.image
            }
        },
    },
    adapter: WorkspaceAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        error: "/",
    },
    events: {
        async signIn(msg) {
            // if user is new, create a personal workspace for them.
            if (msg.isNewUser) {
                const user = await db.user.findUniqueOrThrow({
                    where: {
                        email: msg.user.email as string,
                    },
                    select: { id: true, name: true, email: true },
                });
                const workspaceName = user.name?.replace(/ /g, "") ?? user.email.split("@")[0];

                await db.workspace.create({
                    data: {
                        name: workspaceName + "Personal",
                        userId: user.id,
                    },
                });
            }
        },
    },
};
