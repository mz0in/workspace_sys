"use client";

import React from "react";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { getButtonClasses } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsProps<TData> {
    row: Row<TData>;
}

export function MemberActionsDropdown<TData>({ row }: ActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    className={cn(
                        getButtonClasses({ size: "sm", variant: "ghost" }),
                        "flex h-8 w-8 p-0 data-[state=open]:bg-muted",
                    )}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
