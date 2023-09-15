"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { TeamWithMetadata } from "@/types";
import type { Workspace } from "@prisma/client";
import { Check, ChevronsUpDown, Settings } from "lucide-react";
import type { User } from "next-auth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CreateNewTeam } from "@/components/create-new-team";
import { UserAvatar } from "@/components/user-avatar";
import { CreateWorkspaceButton } from "@/components/workspace/workspace-create-button";

const hoverClass =
    "flex items-center justify-between cursor-pointer outline-none p-1 rounded-md hover:bg-[#F3F5F6]";

interface Props {
    workspaces: Workspace[];
    user: User;
    teams: TeamWithMetadata[];
}

export const WorkspaceSelect: React.FC<Props> = ({ workspaces, user, teams }) => {
    const active = workspaces.find((w) => w.id === user.workspace) ?? workspaces[0];

    const [displayWorkspaces, setDisplayWorkspaces] = useState(() => {
        if (active.type === "personal") {
            return workspaces.filter((w) => w.type === "personal");
        } else {
            return workspaces.filter((w) => w.ownerTeamId === active.ownerTeamId);
        }
    });
    const [settingsLink, setSettingsLink] = useState<string>("/settings");

    return (
        <Popover>
            <PopoverTrigger className={hoverClass}>
                <SingleWorkspace workspace={active} />
                <ChevronsUpDown className="w-4 h-4" />
            </PopoverTrigger>
            { /* prettier-ignore */ }
            <PopoverContent align="start" side="right" className="grid grid-cols-[1fr_5px_1fr] w-fit gap-2">
                <div className="flex flex-col justify-between w-60">
                    <div>
                        <h1 className="text-xs font-medium pb-1">Personal Account</h1>
                        <div
                            className={hoverClass}
                            onMouseOver={() => {
                                setDisplayWorkspaces(() => {
                                    return workspaces.filter((w) => w.type === "personal");
                                });
                                setSettingsLink("/settings");
                            }}
                        >
                            <UserAvatar user={user} />
                            {active.type === "personal" && <Check className="w-4 h-4" />}
                        </div>
                        {teams.length > 0 && (
                            <h1 className="text-xs font-medium py-1">Teams</h1>
                        )}
                        {teams.map((team, i) => (
                            <div
                                key={i}
                                className={hoverClass}
                                onMouseOver={() => {
                                    setDisplayWorkspaces(() => {
                                        return team.team.ownedWorkspaces;
                                    });
                                    setSettingsLink(`/${team.team.slug}/settings`);
                                }}
                            >
                                <SingleTeam teamInfo={team} />
                                {active.ownerTeamId === team.team.id && (
                                    <Check className="w-4 h-4" />
                                )}
                            </div>
                        ))}
                    </div>
                    <CreateNewTeam user={user} />
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-xs font-medium pb-1">Workspaces</h1>
                        <WorkspaceList
                            workspaces={displayWorkspaces}
                            active={active.id}
                            user={user}
                        />
                    </div>
                    <div>
                        <Link 
                            href={settingsLink}
                            className="flex items-center justify-start cursor-pointer p-1 mt-1 rounded-md w-full h-8 text-sm hover:bg-[#F3F5F6]"
                        >
                            <Settings className="w-4 h-4 me-1" /> Settings
                        </Link>
                        <CreateWorkspaceButton userId={user.id} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

interface WorkspaceListProps {
    workspaces: Workspace[];
    active: string;
    user: User;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({ workspaces, active, user }) => {
    const router = useRouter();
    async function switchToWorkspace(id: string) {
        const response = await fetch(`/api/user/${user.id}/workspace`, {
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
                    className={hoverClass}
                    onClick={() => switchToWorkspace(workspace.id)}
                >
                    <SingleWorkspace workspace={workspace} />
                    {workspace.id === active && <Check className="w-4 h-4" />}
                </div>
            ))}
        </div>
    );
};

interface SingleTeamProps {
    teamInfo: TeamWithMetadata;
}

export const SingleTeam: React.FC<SingleTeamProps> = ({ teamInfo }) => {
    const members = teamInfo.team.members.length;
    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
                <AvatarFallback
                    style={{ backgroundColor: teamInfo.team.color }}
                    className="text-white text-lg"
                >
                    {teamInfo.team.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-xs">
                <h1 className="font-medium">{teamInfo.team.name}</h1>
                <h2>{members} Members</h2>
            </div>
        </div>
    );
};

interface SingleWorkspaceProps {
    workspace: Workspace;
}

export const SingleWorkspace: React.FC<SingleWorkspaceProps> = ({ workspace }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
                <AvatarFallback
                    style={{ backgroundColor: workspace.color }}
                    className="text-white text-lg"
                >
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
