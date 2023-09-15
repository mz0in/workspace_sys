"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { Team, TeamMembership } from "@prisma/client";
import { z } from "zod";

import { editTeamSchema } from "@/lib/validators/team";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormGroup,
    FormGroupTitle,
    FormItem,
    FormLabel,
    FormMessage,
    useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { ColorSelectMenu } from "@/components/settings/color-select-menu";

interface Props {
    team: Team & { members: TeamMembership[] };
}

export function EditTeamForm({ team }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useZodForm({
        schema: editTeamSchema,
        defaultValues: { name: team.name, slug: team.slug, color: team.color },
    });
    const router = useRouter();
    async function handleSubmit(data: z.infer<typeof editTeamSchema>) {
        setLoading(true);
    }
    const theme = form.watch("color");
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                <FormGroup>
                    <FormGroupTitle>Logo</FormGroupTitle>
                    <Avatar className="w-14 h-14">
                        <AvatarFallback
                            style={{ backgroundColor: theme }}
                            className="text-white text-2xl"
                        >
                            {team.name.charAt(0).toUpperCase() ?? ""}
                        </AvatarFallback>
                    </Avatar>
                    <div className="w-1/3">
                        <ColorSelectMenu form={form} name="color" />
                    </div>
                </FormGroup>
                <FormGroup>
                    <FormGroupTitle>General</FormGroupTitle>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Team URL</FormLabel>
                                <FormControl>
                                    <Input
                                        addPrefix="workspace.com/"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    A unique identifier for your team.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <SubmitButton loading={loading}>Update</SubmitButton>
                </FormGroup>
            </form>
        </Form>
    );
}
