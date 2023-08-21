import React from "react";

import { Calendar, Inbox } from "lucide-react";
import type { User } from "next-auth";

import { db } from "@/lib/database";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { WorkspaceSelect } from "@/components/layout/workspace-select";
import { UserSettingsDropdown } from "@/components/user-settings-dropdown";

interface Props {
    user: User;
}

export const Sidebar: React.FC<Props> = async ({ user }) => {
    const workspaces = await db.workspace.findMany({
        where: {
            userId: user.id,
        },
    });
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-sidebar border-r-[1.25px] border-r-accent px-2 pb-6 pt-4">
            <div className="flex flex-col space-y-[.15rem]">
                <WorkspaceSelect userId={user.id} workspaces={workspaces} active={user.workspace} />
                <div className="pt-2">
                    <SidebarItem href="/inbox">
                        <Inbox className="w-4 h-4" />
                        <span>Inbox</span>
                    </SidebarItem>
                    <SidebarItem href="/calendar">
                        <Calendar className="w-4 h-4" />
                        <span>Calendar</span>
                    </SidebarItem>
                </div>
            </div>
            <UserSettingsDropdown
                user={{ name: user.name || "", email: user.email!, image: user.image || "" }}
            />
        </aside>
    );
};
