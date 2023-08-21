import type { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User;
    }
    interface User extends Omit<DefaultUser, "id"> {
        id: string;
        workspace?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        workspace?: string | null;
        email: string;
    }
}
