"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
    userId: string;
}

export const UserDelete: React.FC<Props> = ({ userId }) => {
    const router = useRouter();
    async function deleteUser() {
        const response = await fetch(`/api/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId,
            }),
        });
        if (response?.ok) {
            router.refresh();
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
                    <ConfirmDeleteDialog />
                </div>
            </div>
        </Alert>
    );
};

const ConfirmDeleteDialog = () => {
    return <Button size="sm">Delete account</Button>;
}
