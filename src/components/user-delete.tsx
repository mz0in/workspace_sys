"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";
import type { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { 
    AlertDialog, 
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription, 
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { classes } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
    user: Pick<User, "id" | "name">;
}

export const UserDelete: React.FC<Props> = ({ user }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [confirmName, setConfirmName] = useState<string>("");

    const router = useRouter();

    async function deleteUser() {
        const response = await fetch(`/api/user/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.id,
            }),
        });
        if (response?.ok) {
            router.refresh();
            signOut({ callbackUrl: "/" });
        }
    }
    return (
        <Alert className="flex mt-4 bg-zinc-50">
            <AlertTriangle className="stroke-destructive h-4 w-4" />
            <div className="flex justify-between w-full">
                <div className="flex flex-col pt-2">
                    <AlertTitle className="text-destructive">Delete your account</AlertTitle>
                    <AlertDescription className="max-w-[600px]">
                        Delete your account and all information associated with it. You will also leave all of
                        your teams.
                    </AlertDescription>
                </div>
                <div className="flex items-center justify-end pt-2">
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger className={cn(classes["base"], classes["size"]["sm"], classes["variant"]["danger"])}>
                            Delete account
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete account</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete your account? All data associated with your account
                                    will deleted. <span className="font-medium text-destructive">This action cannot be undone.</span>
                                </AlertDialogDescription>
                                <p className="text-sm font-normal pt-2">
                                    Enter your name <span className="font-medium">{user.name}</span> to confirm.
                                </p>
                                <Input onChange={(e) => setConfirmName(e.target.value)} />
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteUser} disabled={confirmName !== user.name}>
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
