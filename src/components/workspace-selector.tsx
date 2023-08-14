"use client";

import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TEST_WORKSPACES = [];

interface Props {}

export const WorkspaceSelector: React.FC<Props> = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Workspace</DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" side="right" align="start" sideOffset={12}>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface WorkspaceInfoProps {}

export const WorkspaceInfo: React.FC<WorkspaceInfoProps> = () => {
    return <div></div>;
};
