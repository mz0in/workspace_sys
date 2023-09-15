import React from "react";

import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Props {
    user: User;
}

export const UserAvatar: React.FC<Props> = ({ user }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
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
