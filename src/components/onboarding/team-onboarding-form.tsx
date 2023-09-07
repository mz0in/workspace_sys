"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";
import type { User } from "next-auth";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { getRandomTheme } from "@/config/constants";
import { newTeamSchema } from "@/lib/validators/team";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { MultiTagsInput } from "@/components/multi-tags-input";
import { ButtonControls } from "@/components/onboarding/onboarding-button-controls";

interface Props {
    user: User;
    close: () => void;
}

export const TeamOnboardingForm: React.FC<Props> = ({ user, close }) => {
    const [step, setStep] = useState<string>("name");
    const form = useZodForm({
        schema: newTeamSchema,
        defaultValues: {
            name: `${user.name}'s team`,
            ownerId: user.id,
            color: getRandomTheme(),
            workspace: "New Workspace",
            emails: [],
        },
        mode: "onChange",
    });
    const router = useRouter();
    async function handleSumbit(data: z.infer<typeof newTeamSchema>) {
        console.log(data);
        // const response = await fetch("/api/team", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         ...data,
        //     }),
        // });
        // if (!response?.ok) {
        //     toast({
        //         title: "Something went wrong",
        //         description: "Your workspace was not updated. Please try again.",
        //         variant: "destructive",
        //     });
        // }
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
                        <ButtonControls prevStep="invite" updateStep={(next) => setStep(next)} />
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
                            <Input placeholder="Name" autoComplete="off" autoFocus {...field} />
                        </FormControl>
                        <FormMessage />
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
    return (
        <React.Fragment>
            <DialogHeader>
                <DialogTitle>Invite teammates</DialogTitle>
            </DialogHeader>
            <MultiTagsInput form={form} name="emails" labelText="Send invites" />
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
                <DialogTitle>Let's create your first workspace</DialogTitle>
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
                    </FormItem>
                )}
            />
        </React.Fragment>
    );
};
