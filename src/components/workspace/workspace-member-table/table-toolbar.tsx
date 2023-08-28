"use client";

import React from "react";

import { Table } from "@tanstack/react-table";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props<TData> {
    table: Table<TData>;
}

export function MemberTableToolbar<TData>({ table }: Props<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter users..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="outline"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8"
                    >
                        Reset
                    </Button>
                )}
            </div>
            <Button className="flex items-center h-8" size="sm">
                <Sparkles className="h-3 w-3 me-1" />
                Upgrade to Team
            </Button>
        </div>
    );
}
