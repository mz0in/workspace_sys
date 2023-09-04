"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import z from "zod";

import { getRandomTheme } from "@/config/constants";
import { newTeamSchema } from "@/lib/validators/team";
import { Button } from "@/components/ui/button";
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

interface Props {
    user: User;
}

export const TeamOnboardingForm: React.FC<Props> = ({ user }) => {
    const [step, setStep] = useState<string>("name");
    const form = useZodForm({
        schema: newTeamSchema,
        mode: "onChange",
        defaultValues: {
            name: `${user.name}'s team`,
            slug: "",
            color: getRandomTheme(),
        },
    });
    function handleSumbit(data: z.infer<typeof newTeamSchema>) {}
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSumbit)}>
                {step === "name" ? (
                    <div className="space-y-2">
                        <TeamNameStep form={form} />
                        <div className="flex justify-end w-full">
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep("invite");
                                }}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                ) : step === "invite" ? (
                    <div className="space-y-2">
                        <div className="flex justify-end w-full gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep("name");
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep("workspace");
                                }}
                            >
                                Next
                            </Button>
                        </div> 
                    </div>
                ) : (
                    <div></div>
                )}
            </form>
        </Form>
    );
};

interface NameProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export const TeamNameStep: React.FC<NameProps> = ({ form }) => {
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

interface StepFormButtonControlProps {
    backStep: string;
    nextStep: string;
    updateStep: () => void;
}

export const StepFormButtonControls: React.FC<StepFormButtonControlProps> = ({ backStep, nextStep }) => {
    return (
        <div className="flex justify-end w-full gap-2"></div>
    );
}