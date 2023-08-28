"use client";

import React, { useState } from "react";

import { PlusSquare } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { WorkspaceOnboardingForm } from "@/components/onboarding/workspace-onboarding-form";

interface Props {
    userId: string;
}

export const CreateWorkspaceButton: React.FC<Props> = ({ userId }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center justify-start p-1 rounded-md w-full h-8 text-sm hover:bg-[#F3F5F6]">
                <PlusSquare className="w-4 h-4 me-1" /> Create new workspace
            </DialogTrigger>
            <DialogContent className="top-[30%]">
                <WorkspaceOnboardingForm userId={userId} close={() => setOpen(!open)} />
            </DialogContent>
        </Dialog>
    );
};
