"use client";

import React from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import { THEMES } from "@/config/constants";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props<T extends FieldValues = any> {
    form: UseFormReturn<T>;
    name: string;
}

export function ColorSelectMenu({ form, name }: Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger showIcon={false} className="outline-none">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {THEMES.map((theme, i) => (
                                <SelectItem key={`theme-${i}`} value={theme.value}>
                                    <div className="flex items-center gap-2">
                                        <Dot color={theme.value} />
                                        {theme.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export const Dot: React.FC<{ color: string }> = ({ color }) => (
    <div style={{ backgroundColor: color }} className="h-[.65rem] w-[.65rem] rounded-md" />
);
