"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { Workspace } from "@prisma/client";
import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getButtonClasses } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    workspace: Pick<Workspace, "id" | "name">;
}

export const WorkspaceDelete: React.FC<Props> = ({ workspace }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [confirmName, setConfirmName] = useState<string>("");
    const router = useRouter();
    async function deleteUser() {
        const response = await fetch(`/api/workspace/${workspace.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response?.ok) {
            router.refresh();
        }
    }

    return (
        <Alert className="flex mt-4" variant="destructive">
            <AlertTriangle className="stroke-destructive h-4 w-4" />
            <div className="flex justify-between w-full">
                <div className="flex flex-col pt-2">
                    <AlertTitle className="text-destructive">Delete this workspace</AlertTitle>
                    <AlertDescription className="max-w-[600px]">
                        Delete this workspace and all information associated with it. This includes
                        all projects, events, and workflows. All members will be removed.
                    </AlertDescription>
                </div>
                <div className="flex items-center justify-end pt-2">
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger
                            className={getButtonClasses({ size: "sm", variant: "danger" })}
                        >
                            Delete workspace
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete workspace</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this workspace? All data
                                    associated with it will deleted.{" "}
                                    <span className="font-medium text-destructive">
                                        This action cannot be undone.
                                    </span>
                                </AlertDialogDescription>
                                <Label className="text-sm font-normal pt-2">
                                    Enter the workspace name{" "}
                                    <span className="font-medium">{workspace.name}</span> to
                                    confirm.
                                </Label>
                                <Input onChange={(e) => setConfirmName(e.target.value)} />
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={deleteUser}
                                    variant="danger"
                                    disabled={confirmName !== workspace.name}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Alert>
    );
};
