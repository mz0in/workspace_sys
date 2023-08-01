import React from "react";

import { Calendar, Inbox } from "lucide-react";
import type { User } from "next-auth";

import { SidebarItem } from "@/components/layout/sidebar-item";

interface Props {
    user: User;
}

export const Sidebar: React.FC<Props> = ({ user }) => {
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-sidebar border-r-[1.25px] border-r-accent px-2 pb-6 pt-4">
            <div className="flex flex-col space-y-[.15rem]">
                <SidebarItem href="/inbox">
                    <Inbox className="w-4 h-4" />
                    <span>Inbox</span>
                </SidebarItem>
                <SidebarItem href="/calendar">
                    <Calendar className="w-4 h-4" />
                    <span>Calendar</span>
                </SidebarItem>
            </div>
        </aside>
    );
};
