"use client";

import React, { useState } from "react";

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
    deleteItem: string;
    deleteConfirmText: string;
    // function called when delete button is clicked
    onDelete: () => void;
}

export function AlertDeleteDialog({ deleteItem, deleteConfirmText, onDelete }: Props) {
    const [confirm, setConfirm] = useState<string>("");
    return (
        <AlertDialog>
            <AlertDialogTrigger className={getButtonClasses({ variant: "danger", size: "sm" })}>
                Delete {deleteItem}
            </AlertDialogTrigger>
            <AlertDialogContent className="top-[30%] w-[30%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {deleteItem}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this {deleteItem}? All data associated with
                        the {deleteItem} will deleted.{" "}
                        <span className="font-medium text-destructive">
                            This action cannot be undone.
                        </span>
                    </AlertDialogDescription>
                    <Label className="text-sm font-normal pt-2">
                        Enter the {deleteItem} name{" "}
                        <span className="font-medium">{deleteConfirmText}</span> to confirm.
                    </Label>
                    <Input onChange={(e) => setConfirm(e.target.value)} />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onDelete}
                        variant="danger"
                        disabled={confirm !== deleteConfirmText}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
