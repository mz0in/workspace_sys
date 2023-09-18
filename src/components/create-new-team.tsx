"use client";

import React, { useState } from "react";

import { PlusSquare } from "lucide-react";
import type { User } from "next-auth";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TeamOnboardingForm } from "@/components/onboarding/team-onboarding-form";

interface Props {
    user: User;
}

export const CreateNewTeam: React.FC<Props> = ({ user }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <PlusSquare className="w-4 h-4 me-1" /> Create new team
            </DialogTrigger>
            <DialogContent className="top-[30%] w-[30%]">
                <TeamOnboardingForm user={user} close={() => setOpen(!open)} />
            </DialogContent>
        </Dialog>
    );
};
