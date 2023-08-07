"use client";

import React from "react";

import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLink,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Props, UserAvatar } from "@/components/user-avatar";

interface DropdownProps extends Props {}

export const UserSettingsDropdown: React.FC<DropdownProps> = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger id={`${user.name}-settings`} className="flex justify-between outline-none rounded-md p-1 hover:bg-[#E1E3E7]">
                <UserAvatar user={user} />
                <ChevronsUpDown className="w-4 h-4 my-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" side="right" align="end" sideOffset={12}>
                <DropdownMenuLink
                    href="/settings"
                    className="flex flex-col items-start gap-y-3 text-foreground"
                >
                    <UserAvatar user={user} />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </div>
                        <span className="text-xs">⌘S</span>
                    </div>
                </DropdownMenuLink>
                <DropdownMenuItem>
                    <div
                        className="flex items-center justify-between w-full cursor-pointer text-foreground"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <div className="flex items-center gap-2">
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </div>
                        <span className="text-xs">⌘Q</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
