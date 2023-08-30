"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { Workspace } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CreateWorkspaceButton } from "@/components/workspace/workspace-create-button";

interface Props {
    userId: string;
    workspaces: Workspace[];
    active?: string | null;
}

export const WorkspaceSelect: React.FC<Props> = ({ userId, workspaces, active }) => {
    const selected = workspaces.find((workspace) => workspace.id === active) ?? workspaces[0];
    return (
        <Popover>
            <PopoverTrigger className="flex items-center justify-between outline-none p-1 rounded-md hover:bg-[#F3F5F6]">
                <div className="flex items-center gap-2">
                    <Avatar className="w-9 h-9">
                        <AvatarFallback
                            style={{ backgroundColor: selected.color }}
                            className="text-white text-xl"
                        >
                            {selected.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left text-xs">
                        <h1 className="font-medium">{selected.name}</h1>
                        <h2>{selected.type.charAt(0).toUpperCase() + selected.type.slice(1)}</h2>
                    </div>
                </div>
                <ChevronsUpDown className="w-4 h-4" />
            </PopoverTrigger>
            <PopoverContent side="right" align="start">
                <h1 className="text-xs font-medium pb-1">Personal Workspaces</h1>
                <WorkspaceList workspaces={workspaces} active={selected.id} userId={userId} />
                <h1 className="text-xs font-medium py-1">Teams</h1>
                <div className="w-full">
                    <Separator className="my-1" />
                    <CreateWorkspaceButton userId={userId} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

interface WorkspaceListProps {
    workspaces: Workspace[];
    active: string;
    userId: string;
}

const WorkspaceList: React.FC<WorkspaceListProps> = ({ workspaces, active, userId }) => {
    const router = useRouter();
    async function switchToWorkspace(id: string) {
        const response = await fetch(`/api/user/${userId}/workspace`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newWorkspaceId: id,
            }),
        });
        if (!response?.ok) {
            toast({
                title: "Something went wrong",
                description: "You were unable to switch workspaces. Please try again.",
                variant: "destructive",
            });
        }
        router.refresh();
    }
    return (
        <div className="gap-y-1">
            {workspaces.map((workspace, i) => (
                <div
                    key={`workspace-${i}`}
                    className="flex items-center justify-between cursor-pointer outline-none p-1 rounded-md hover:bg-[#F3F5F6]"
                    onClick={() => switchToWorkspace(workspace.id)}
                >
                    <div className="flex items-center gap-2">
                        <Avatar className="w-9 h-9">
                            <AvatarFallback
                                style={{ backgroundColor: workspace.color }}
                                className="text-white text-xl"
                            >
                                {workspace.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left text-xs">
                            <h1 className="font-medium">{workspace.name}</h1>
                            <h2>
                                {workspace.type.charAt(0).toUpperCase() + workspace.type.slice(1)}
                            </h2>
                        </div>
                    </div>
                    {workspace.id === active && <Check className="w-4 h-4" />}
                </div>
            ))}
        </div>
    );
};
