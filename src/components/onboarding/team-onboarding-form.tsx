"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { getRandomTheme } from "@/config/constants";
import { slugify } from "@/lib/utils";
import { newTeamSchema } from "@/lib/validators/team";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import { MultiTagsInput } from "@/components/multi-tags-input";
import { ButtonControls } from "@/components/onboarding/onboarding-button-controls";

interface Props {
    user: User;
    close: () => void;
}

export const TeamOnboardingForm: React.FC<Props> = ({ user, close }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<string>("name");
    const form = useZodForm({
        schema: newTeamSchema,
        defaultValues: {
            name: "",
            slug: "",
            ownerId: user.id,
            color: getRandomTheme(),
            workspace: "Untitled Workspace",
            emails: [],
        },
        mode: "onChange",
    });
    useEffect(() => {
        if (!form.formState.isValid) {
            const error = Object.keys(form.formState.errors);
            const step1 = ["name", "slug"];
            const step2 = ["emails"];
            if (step1.some((err) => error.includes(err))) setStep("name");
            else if (step2.some((err) => error.includes(err))) setStep("invite");
        }
    }, [form.formState]);
    const router = useRouter();
    async function handleSumbit(data: z.infer<typeof newTeamSchema>) {
        setLoading(true);
        const response = await fetch("/api/team", {
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
                description: "Your workspace was not updated. Please try again.",
                variant: "destructive",
            });
        }
        setLoading(false);
        close();
        router.refresh();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSumbit)}>
                {step === "name" ? (
                    <div className="space-y-2">
                        <TeamNameStep form={form} />
                        <ButtonControls nextStep="invite" updateStep={(next) => setStep(next)} />
                    </div>
                ) : step === "invite" ? (
                    <div className="space-y-2">
                        <InviteMembersStep form={form} />
                        <ButtonControls
                            nextStep="workspace"
                            prevStep="name"
                            updateStep={(next) => setStep(next)}
                        />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <WorkspaceStep form={form} />
                        <ButtonControls
                            prevStep="invite"
                            updateStep={(next) => setStep(next)}
                            loading={loading}
                        />
                    </div>
                )}
            </form>
        </Form>
    );
};

interface NameStepProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export const TeamNameStep: React.FC<NameStepProps> = ({ form }) => {
    const watchName = form.watch("name");
    useEffect(() => {
        if (!Object.keys(form.formState.dirtyFields).includes("slug")) {
            form.setValue("slug", slugify(watchName));
        }
    }, [watchName, form]);
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle>Create a new team</DialogTitle>
            </DialogHeader>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Acme Inc."
                                autoComplete="off"
                                autoFocus
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Team URL</FormLabel>
                        <FormControl>
                            <Input addPrefix="workspace.com/" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>A unique identifier for your team.</FormDescription>
                    </FormItem>
                )}
            />
        </React.Fragment>
    );
};

interface InviteStepProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export const InviteMembersStep: React.FC<InviteStepProps> = ({ form }) => {
    const errors = form.formState.errors;
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle>Invite teammates</DialogTitle>
            </DialogHeader>
            <MultiTagsInput
                form={form}
                name="emails"
                labelText="Send invites"
                error={Object.keys(errors).includes("emails")}
                errorMsg="Please provide valid email addresses only."
            />
        </React.Fragment>
    );
};

interface WorkspaceStepProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export const WorkspaceStep: React.FC<WorkspaceStepProps> = ({ form }) => {
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle>Let&apos;s create your first workspace</DialogTitle>
            </DialogHeader>
            <FormField
                control={form.control}
                name="workspace"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="New workspace"
                                autoFocus
                                autoComplete="off"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                            Workspaces are shared environments where you can collaborate with
                            teammates on projects, share events, and much more!
                        </FormDescription>
                    </FormItem>
                )}
            />
        </React.Fragment>
    );
};
