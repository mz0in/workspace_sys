"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Info, PlusSquare } from "lucide-react";
import { z } from "zod";

import { getRandomTheme } from "@/config/themes";
import { newWorkspaceSchema } from "@/lib/validators/workspace";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface Props {
    teamSlug?: string;
    type: "personal" | "team";
    userId: string;
}

export function CreateNewWorkspace({ userId, teamSlug, type }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <PlusSquare className="w-4 h-4 me-1" /> Create new workspace
            </DialogTrigger>
            <DialogContent className="top-[30%] w-[30%]">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>Create a new workspace</DialogTitle>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="w-4 h-4 stroke-[1.5]" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={6} className="text-center">
                                A workspace is a centralized environment where you can manage tasks,
                                projects, calendar events, and create custom workflows.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogHeader>
                <CreateWorkspaceForm
                    userId={userId}
                    teamSlug={teamSlug}
                    type={type}
                    close={() => setOpen(!open)}
                />
            </DialogContent>
        </Dialog>
    );
}

export function CreateWorkspaceForm({
    userId,
    teamSlug,
    type,
    close,
}: Props & { close: () => void }) {
    const [loading, setLoading] = useState<boolean>(false);
    // When creating a new workspace, give it a random theme.
    const form = useZodForm({
        schema: newWorkspaceSchema,
        defaultValues: {
            name: "",
            color: getRandomTheme(),
            type: type,
            teamSlug: teamSlug ?? undefined,
        },
    });
    const router = useRouter();
    async function handleSubmit(data: z.infer<typeof newWorkspaceSchema>) {
        setLoading(true);
        const url = teamSlug ? `/api/team/${teamSlug}/workspace` : `/api/user/${userId}/workspace`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
            }),
        });
        if (!response?.ok) {
            toast({
                title: "Something went wrong",
                description: "Unable to create new workspace",
                variant: "destructive",
            });
        }
        setLoading(false);
        router.refresh();
        close();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoFocus autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Choose a name that represents how you will use the workspace.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end w-full pt-2">
                    <SubmitButton loading={loading} disable={!form.formState.isValid}>
                        Create
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}
