"use client";

import React from "react";

import type { User } from "@prisma/client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const columns: ColumnDef<Pick<User, "name" | "email">>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
            </Button>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
];

interface Props<Data, Value> {
    columns: ColumnDef<Data, Value>[];
    data: Data[];
}

export function WorkspaceMemberTable<Data, Value>({ columns, data }: Props<Data, Value>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="rounded-md border">
            <Table></Table>
        </div>
    );
}
