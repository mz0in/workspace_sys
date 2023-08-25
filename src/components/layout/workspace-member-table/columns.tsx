"use client";

import React from "react";

import type { WorkspaceWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberActionsDropdown } from "@/components/layout/workspace-member-table/row-actions-dropdown";

export const columns: ColumnDef<WorkspaceWithUser>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ChevronsUpDown className="w-3 h-3 ms-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center gap-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={member.image} alt={`@${row.getValue("name")}`} />
                        <AvatarFallback>
                            {member.name ? (member.name as string).charAt(0).toUpperCase() : ""}
                        </AvatarFallback>
                    </Avatar>
                    <h1>{member.name}</h1>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Role
                <ChevronsUpDown className="w-3 h-3 ms-2" />
            </Button>
        ),
        cell: ({ row }) => (
            <Badge className="capitalize" variant={row.original.role}>
                {row.original.role}
            </Badge>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <MemberActionsDropdown row={row} />,
    },
];
