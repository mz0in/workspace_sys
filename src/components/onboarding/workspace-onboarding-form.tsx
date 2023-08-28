"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, Loader, User, Users } from "lucide-react";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { WORKSPACE_THEMES } from "@/config/constants";
import { newWorkspaceSchema } from "@/lib/validators/workspace";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ThemeDot } from "@/components/edit-workspace-form";

interface Props {
    userId: string;
    close: () => void;
}

export const WorkspaceOnboardingForm: React.FC<Props> = ({ userId, close }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<string>("type");
    const form = useZodForm({
        schema: newWorkspaceSchema,
        defaultValues: {
            type: "personal",
            name: "My Workspace",
            color: "#27272a",
        },
        mode: "onSubmit",
    });
    const router = useRouter();
    async function handleSubmit(data: z.infer<typeof newWorkspaceSchema>) {
        setLoading(true);
        const response = await fetch(`/api/user/${userId}/workspace`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
            }),
        });
        setLoading(false);
        if (!response?.ok) {
            toast({
                title: "Something went wrong",
                description: "Your workspace was not updated. Please try again.",
                variant: "destructive",
            });
        }
        close();
        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {step === "type" ? (
                    <div>
                        <WorkspaceTypeStep form={form} />
                        <div className="flex justify-end w-full pt-2">
                            <Button
                                className="flex items-center"
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep("name");
                                }}
                            >
                                Next
                                <ChevronRight className="h-3 w-3 ms-[2px]" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <WorkspaceInfoStep form={form} />
                        <div className="flex justify-between w-full gap-2 pt-2">
                            <Button
                                className="flex items-center"
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep("type");
                                }}
                            >
                                <ChevronLeft className="h-3 w-3 me-[2px]" />
                                Back
                            </Button>
                            <Button
                                className="flex items-center"
                                size="sm"
                                type="submit"
                                disabled={loading}
                            >
                                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Create
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
};

const labelClass =
    "flex flex-col items-center justify-between space-y-2 rounded-md border-2 \
                    border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground \
                    peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary";

interface WorkspaceTypeProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

const WorkspaceTypeStep: React.FC<WorkspaceTypeProps> = ({ form }) => {
    return (
        <React.Fragment>
            <DialogHeader className="text-center">
                <DialogTitle>How do you plan to use this workspace?</DialogTitle>
                <DialogDescription>
                    We will streamline your setup process accordingly to fit your needs.
                </DialogDescription>
            </DialogHeader>
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <WorkspaceRadioGroup field={field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </React.Fragment>
    );
};

interface WorkspaceRadioGroupProps {
    field: ControllerRenderProps<any, "type">;
}

const WorkspaceRadioGroup: React.FC<WorkspaceRadioGroupProps> = ({ field }) => {
    return (
        <RadioGroup
            className="grid grid-cols-2 gap-4 pt-4"
            value={field.value}
            onChange={field.onChange}
        >
            <div>
                <RadioGroupItem id="personal" value="personal" className="peer sr-only" />
                <Label htmlFor="personal" className={labelClass}>
                    <User className="w-12 h-12" />
                    <div className="flex flex-col items-center space-y-1 text-center">
                        <h1 className="font-semibold text-lg">For personal use</h1>
                        <h2 className="font-normal">
                            Manage events, tasks, and notes in one centralized platform.
                        </h2>
                    </div>
                </Label>
            </div>
            <div>
                <RadioGroupItem id="team" value="team" className="peer sr-only" disabled />
                <Label htmlFor="team" className={labelClass}>
                    <Users className="w-12 h-12" />
                    <div className="flex flex-col items-center space-y-1 text-center">
                        <h1 className="font-semibold text-lg">For my team</h1>
                        <h2 className="font-normal">
                            Collaborate on projects and documents together.
                        </h2>
                    </div>
                </Label>
            </div>
        </RadioGroup>
    );
};

interface WorkspaceInfoProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

const WorkspaceInfoStep: React.FC<WorkspaceInfoProps> = ({ form }) => {
    const c = form.watch("color");
    const n = form.watch("name");
    const t = form.watch("type");

    return (
        <div className="space-y-2 py-2">
            <DialogHeader className="text-center">
                <DialogTitle>What should we call your new workspace?</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center w-full gap-2 space-y-1 py-2">
                <Avatar className="w-14 h-14">
                    <AvatarFallback style={{ backgroundColor: c }} className="text-white text-2xl">
                        {n.charAt(0).toUpperCase() ?? ""}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left text-lg">
                    <h1 className="font-semibold">{n}</h1>
                    <h2 className="text-sm">{t.charAt(0).toUpperCase() + t.slice(1)}</h2>
                </div>
            </div>
            <Separator />
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
                                {WORKSPACE_THEMES.map((theme, i) => (
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
        </div>
    );
};
