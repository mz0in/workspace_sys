import React from "react";

import { Calendar, Inbox } from "lucide-react";
import type { User } from "next-auth";

import { db } from "@/lib/database";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { UserSettingsDropdown } from "@/components/user-settings-dropdown";
import { WorkspaceSelect } from "@/components/workspace/workspace-select";

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
                }
            },
        },
    });
    console.log(teams)
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-sidebar border-r-[1.25px] border-r-accent px-2 pb-6 pt-4">
            <div className="flex flex-col space-y-[.15rem]">
                <WorkspaceSelect
                    userId={user.id}
                    workspaces={workspaces.map((workspace) => workspace.workspace)}
                    active={user.workspace}
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
            <UserSettingsDropdown
                user={{ name: user.name || "", email: user.email!, image: user.image || "" }}
            />
        </aside>
    );
};
