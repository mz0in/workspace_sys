"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "@prisma/client";
import { Loader } from "lucide-react";
import { z } from "zod";

import { editUserSchema } from "@/lib/validators/user";
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
import { toast } from "@/components/ui/use-toast";

interface Props {
    user: Pick<User, "id" | "name" | "email" | "image">;
}

export const UserSettingsForm: React.FC<Props> = ({ user }) => {
    const [saving, setSaving] = useState<boolean>(false);
    const form = useZodForm({
        schema: editUserSchema,
        defaultValues: { name: user.name || "" },
    });
    const router = useRouter();
    async function handleSubmit(data: z.infer<typeof editUserSchema>) {
        setSaving(true);
        const response = await fetch(`/api/user/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
            }),
        });
        setSaving(false);
        if (!response?.ok) {
            toast({
                title: "Something went wrong",
                description: "Your name was not updated. Please try again.",
                variant: "destructive",
            });
        }
        toast({
            description: "Your name has been updated successfully.",
        });
        router.refresh();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-1/2 space-y-4">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input disabled value={user.email} />
                </FormItem>
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
                <Button size="sm" type="submit" disabled={saving}>
                    {saving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    <span>Update</span>
                </Button>
            </form>
        </Form>
    );
};
