"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Workspace } from "@prisma/client";
import { Loader } from "lucide-react";
import { z } from "zod";

import { THEMES } from "@/config/themes";
import { editWorkspaceSchema } from "@/lib/validators/workspace";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface Props {
    workspace: Pick<Workspace, "id" | "name" | "type" | "color">;
}

export const EditWorkspaceForm: React.FC<Props> = ({ workspace }) => {
    const [saving, setSaving] = useState<boolean>(false);
    const form = useZodForm({
        schema: editWorkspaceSchema,
        defaultValues: { name: workspace.name, color: workspace.color },
    });
    useEffect(() => {
        form.setValue("name", workspace.name);
        form.setValue("color", workspace.color);
    }, [form, workspace]);
    const router = useRouter();
    async function handleSubmit(data: z.infer<typeof editWorkspaceSchema>) {
        setSaving(true);
        const response = await fetch(`/api/workspace/${workspace.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                color: data.color,
            }),
        });
        setSaving(false);
        if (!response?.ok) {
            toast({
                title: "Something went wrong",
                description: "Your workspace was not updated. Please try again.",
                variant: "destructive",
            });
        }
        toast({
            description: "Your workspace has been updated successfully.",
        });
        router.refresh();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-1/2 space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display name</FormLabel>
                            <FormControl>
                                <Input placeholder="Display name" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
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
                                                <ThemeDot color={theme.value} />
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
                <Button size="sm" type="submit" disabled={saving}>
                    {saving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    <span>Update</span>
                </Button>
            </form>
        </Form>
    );
};

export const ThemeDot: React.FC<{ color: string }> = ({ color }) => (
    <div style={{ backgroundColor: color }} className="h-[.65rem] w-[.65rem] rounded-md" />
);
