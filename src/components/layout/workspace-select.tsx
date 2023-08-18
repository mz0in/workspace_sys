"use client";

import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

interface Props { }

export const WorkspaceSelect: React.FC<Props> = () => {
    return (
        <Popover>
            <PopoverTrigger>

            </PopoverTrigger>
        </Popover>
    );
}

interface WorkspaceListProps { }

const WorkspaceList: React.FC<WorkspaceListProps> = () => {
    return <div></div>;
}