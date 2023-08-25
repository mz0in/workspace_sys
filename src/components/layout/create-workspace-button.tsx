"use client";

import React, { useState } from "react";
import Image from "next/image";

import { PlusSquare } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {}

export const CreateWorkspaceButton: React.FC<Props> = () => {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center justify-start p-1 rounded-md w-full h-8 text-sm hover:bg-[#F3F5F6]">
                <PlusSquare className="w-4 h-4 me-1" /> Create new workspace
            </DialogTrigger>
            <DialogContent className="top-[30%]">
                <h1 className="font-semibold leading-none tracking-tight">Create new workspace</h1>
            </DialogContent>
        </Dialog>
    );
};
