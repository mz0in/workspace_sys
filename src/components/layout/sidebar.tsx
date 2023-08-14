import React from "react";

import { Calendar, Inbox } from "lucide-react";
import type { User } from "next-auth";

import { SidebarItem } from "@/components/layout/sidebar-item";
import { UserSettingsDropdown } from "@/components/user-settings-dropdown";
import { WorkspaceSelector } from "@/components/workspace-selector";

interface Props {
    user: User;
}

export const Sidebar: React.FC<Props> = async ({ user }) => {
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-sidebar border-r-[1.25px] border-r-accent px-2 pb-6 pt-4">
            <div className="flex flex-col space-y-[.15rem]">
                <WorkspaceSelector />
                <SidebarItem href="/inbox">
                    <Inbox className="w-4 h-4" />
                    <span>Inbox</span>
                </SidebarItem>
                <SidebarItem href="/calendar">
                    <Calendar className="w-4 h-4" />
                    <span>Calendar</span>
                </SidebarItem>
            </div>
            <UserSettingsDropdown
                user={{ name: user.name || "", email: user.email!, image: user.image || "" }}
            />
        </aside>
    );
};
