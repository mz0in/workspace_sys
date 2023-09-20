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
    const workspaces = await db.workspaceMembership.findMany({
        where: {
            userId: user.id,
        },
        include: {
            workspace: true,
        },
    });
    const teams = await db.teamMembership.findMany({
        where: {
            userId: user.id,
        },
        include: {
            team: {
                include: {
                    members: true,
                    ownedWorkspaces: true,
                },
            },
        },
    });
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-sidebar border-r-[1.25px] border-r-accent px-2 pb-6 pt-4">
            <div className="flex flex-col space-y-[.15rem]">
                <WorkspaceSelect
                    workspaces={workspaces.map((workspace) => workspace.workspace)}
                    user={user}
                    teams={teams}
                />
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
            <UserSettingsDropdown user={user} />
        </aside>
    );
};
