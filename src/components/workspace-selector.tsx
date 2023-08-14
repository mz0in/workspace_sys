"use client";

import React from "react";

import { useWorkspaces } from "@/hooks/use-workspaces";

interface Props {}

export const WorkspaceSelector: React.FC<Props> = () => {
    const { workspaces } = useWorkspaces();
    console.log(workspaces);
    return <div>{}</div>
};
