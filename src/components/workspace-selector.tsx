"use client";

import React, { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: Refactor file when implementing real functionality

type Workspace = { id: number; name: string; type: string; color: string };
const TEST_WORKSPACES: Workspace[] = [
    {
        id: 1,
        name: "Jacks Personal",
        type: "personal",
        color: "#4f46e5",
    },
    {
        id: 2,
        name: "Life Workspace",
        type: "personal",
        color: "#10b981",
    },
    {
        id: 3,
        name: "Maxpayload",
        type: "team",
        color: "#3f3f46",
    },
    {
        id: 4,
        name: "Workspace Dev",
        type: "team",
        color: "#e11d48",
    },
    {
        id: 4,
        name: "The Vici Group",
        type: "team",
        color: "#f97316",
    },
];

interface Props {}

export const WorkspaceSelector: React.FC<Props> = () => {
    const [active, setActive] = useState<Workspace>(TEST_WORKSPACES[0]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between outline-none p-1 rounded-md hover:bg-[#F3F5F6]">
                <div className="flex items-center gap-2">
                    <Avatar className="w-9 h-9">
                        <AvatarFallback
                            style={{ backgroundColor: active.color }}
                            className="text-white"
                        >
                            {active.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left text-xs">
                        <h1 className="font-medium">{active.name}</h1>
                        <h2>{active.type.charAt(0).toUpperCase() + active.type.slice(1)}</h2>
                    </div>
                </div>
                <ChevronsUpDown className="w-4 h-4 my-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 space-y-1"
                side="right"
                align="start"
                sideOffset={12}
            >
                <h1 className="px-1 font-medium text-sm">Your Workspaces</h1>
                <DropdownMenuSeparator />
                {TEST_WORKSPACES.map((workspace, i) => (
                    <WorkspaceInfo key={i} workspace={workspace} />
                ))}
                <DropdownMenuSeparator />
                <p>Create New Workspace</p>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface WorkspaceInfoProps {
    workspace: Workspace;
    isActive?: boolean;
}

export const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({ workspace, isActive = false }) => {
    return (
        <div className="flex items-center gap-2 p-1 hover:bg-[#F4F4F5] rounded-md cursor-pointer">
            <Avatar className="w-9 h-9">
                <AvatarFallback style={{ backgroundColor: workspace.color }} className="text-white">
                    {workspace.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-xs">
                <h1 className="font-medium">{workspace.name}</h1>
                <h2>{workspace.type.charAt(0).toUpperCase() + workspace.type.slice(1)}</h2>
            </div>
        </div>
    );
};
