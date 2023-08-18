import React from "react";

import type { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Props {
    user: Pick<User, "email" | "image" | "name">;
}

export const UserAvatar: React.FC<Props> = ({ user }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-9 h-9">
                <AvatarImage src={user.image ?? undefined} alt="" />
                <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-xs">
                <h1 className="font-medium">{user.email}</h1>
                <h2>@{user.name}</h2>
            </div>
        </div>
    );
};
