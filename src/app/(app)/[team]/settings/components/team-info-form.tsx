"use client";

import React, { useState } from "react";

import type { Team, TeamMembership } from "@prisma/client";
import { z } from "zod";

import { editTeamSchema } from "@/lib/validators/team";
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

interface Props {
    team: Team & { members: TeamMembership[] };
}

export function TeamInfoForm({ team }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useZodForm({
        schema: editTeamSchema,
        defaultValues: { name: team.name },
    });
    async function handleSubmit(data: z.infer<typeof editTeamSchema>) {}
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}></form>
        </Form>
    );
}
